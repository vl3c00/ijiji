import React from 'react';

function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      {/* WhatsApp Section */}
      <div className="mb-4">
        <p className="text-xl font-semibold">Request tokens WhatsApp:</p>
        <p className="text-lg text-green-600">
          <a href="https://wa.me/263783167934" target="_blank" rel="noopener noreferrer">
            0783167934
          </a>
        </p>
      </div>

      {/* Email Section */}
      <div className="mb-4">
        <p className="text-xl font-semibold">Email:</p>
        <p className="text-lg text-green-600">
          <a href="mailto:carlosalec8969@gmail.com" target="_blank" rel="noopener noreferrer">
            carlosalec8969@gmail.com
          </a>
        </p>
      </div>

      {/* Location Section */}
      <div className="mb-4">
        <p className="text-xl font-semibold">Location:</p>
        <p className="text-lg">
          High Performance Computing Centre Building <br />
          Zimbabwe Science Park 1 <br />
          630 Churchill Avenue, Mount Pleasant, <br />
          Harare, Zimbabwe
        </p>
      </div>

      {/* Additional styling can be applied to this page */}
    </div>
  );
}

export default Page;
