import React from 'react'


const ProofpaymentTab = ({ group }) => {
  return (
    <img
      src={`http://localhost:8080/api/v1.0${group.proofPayment}`}
      alt="Proof of Payment"
      className="h-100 object-cover"
    />
  )
}

export default ProofpaymentTab