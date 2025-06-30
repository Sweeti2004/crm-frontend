import axios from 'axios';

export const getAllTickets = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get('http://localhost:5000/v1/ticket', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuamFsaS5zaGFybWFAMTIzNC5jb20iLCJpYXQiOjE3NTEyNjM0MTgsImV4cCI6MTc1MTM0OTgxOH0.6VS875fUvnVjul_XDZzzEa9A7bMSzuk1mBsBNOvPUJI',
        },
      });
      resolve(result); // ✅ fix: resolve the result
    } catch (error) {
      reject(error); // ✅ fix: reject the error
    }
  });
};
