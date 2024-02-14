import axios from "axios";

export const VerifyTC = (token, id, companyorDist) =>
  axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${companyorDist}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (
        res.data.partnerAdmin.policy === false &&
        res.data.representative.policy === false
      ) {
        return true;
      }
      return false;
    });
