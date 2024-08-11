import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");
console.log(socket);

const Home = () => {
  const { currentUser } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newParcel, setNewParcel] = useState({
    name: "",
    source: "",
    destination: "",
  });

  useEffect(() => {
    fetchParcels();

    socket.on("newParcel", (parcel) => {
      setParcels((prevParcels) => [...prevParcels, parcel]);
    });

    socket.on("deleteParcel", (id) => {
      setParcels((prevParcels) =>
        prevParcels.filter((parcel) => parcel.id !== id)
      );
    });

    return () => {
      socket.off("newParcel");
      socket.off("deleteParcel");
    };
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/parcels");
      setParcels(response.data);
    } catch (error) {
      console.error("Error fetching parcels:", error);
    }
  };

  const addParcel = async (e) => {
    e.preventDefault();
    try {
    //   await axios.post("http://localhost:5000/api/parcels", newParcel);
    console.log('line 51')
    socket.emit('addParcel', 'test1');
      setShowForm(false);
      setNewParcel({ name: "", source: "", destination: "" });
    } catch (error) {
      console.error("Error adding parcel:", error);
    }
  };

  const deleteParcel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/parcels/${id}`);
    } catch (error) {
      console.error("Error deleting parcel:", error);
    }
  };

  const handleClick = () => {
    setShowForm(true);
    socket.emit('addParcel', () => {
        console.log('Socket parcel sent')
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center my-4">
          <div className="font-bold">User</div>
          <div>{currentUser.email}</div>
        </div>

        <button
          onClick={() => handleClick()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
        >
          Add Parcel
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Add New Parcel</h3>
            <form onSubmit={addParcel}>
              <input
                type="text"
                placeholder="Parcel Name"
                value={newParcel.name}
                onChange={(e) =>
                  setNewParcel({ ...newParcel, name: e.target.value })
                }
                className="w-full p-2 mb-3 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Source"
                value={newParcel.source}
                onChange={(e) =>
                  setNewParcel({ ...newParcel, source: e.target.value })
                }
                className="w-full p-2 mb-3 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Destination"
                value={newParcel.destination}
                onChange={(e) =>
                  setNewParcel({ ...newParcel, destination: e.target.value })
                }
                className="w-full p-2 mb-3 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
              >
                Add My Parcel
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="ml-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {parcels.length === 0 ? (
          <p className="p-4">
            No parcels added. Click "Add Parcel" to create one.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parcel Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parcels.map((parcel, index) => (
                <tr key={parcel.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{parcel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcel.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcel.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcel.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteParcel(parcel.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mr-2 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
