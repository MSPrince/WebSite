import React from 'react'

const AdminStats = ({stats}) => {
    console.log(stats)
  return (
    <div className="my-5 space-y-4">
      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        <div className="bg-white shadow-md rounded-lg py-5 px-4 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer flex gap-6">
          <h2 className="text-lg font-semibold ">
            <img className="h-6"
              src="https://cdn-icons-png.flaticon.com/128/5501/5501360.png"
              alt=""
            />{" "}
          </h2>
          <p className="text-lg font-bold">{stats?.totalEarnings} Rupees</p>
        </div>
        <div className="bg-white shadow-md rounded-lg py-5 px-4 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer flex gap-6">
          <h2 className="text-lg font-semibold ">
            <img className="h-6"
              src="https://cdn-icons-png.flaticon.com/128/4772/4772907.png"
              alt=""
            />
          </h2>
          <p className="text-xl font-bold">{stats?.totalOrders} Orders</p>
        </div>

        <div className="bg-white shadow-md rounded-lg py-5 px-4 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer flex gap-6">
          <h2 className="text-lg font-semibold ">
            <img className="h-6"
              src="https://cdn-icons-png.flaticon.com/128/10951/10951869.png"
              alt=""
            />
          </h2>
          <p className="text-xl font-bold">{stats?.totalProducts} Products</p>
        </div>
      </div>
    </div>
  );
}

export default AdminStats