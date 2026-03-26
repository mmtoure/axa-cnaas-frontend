import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { rejectClaim } from '../features/claim/claimThunk';

const RejectClaimModal = ({isOpen, onClose, claimId, onRejected}) => {
    const [loading, setLoading] = React.useState(false);
    const [reason, setReason] = React.useState("");
    const dispatch = useDispatch()

  const handleRejectClaim = (claimId,reason) => () => {
    console.log({claimId, reason});
    
   dispatch(rejectClaim({
      id: claimId,
      rejectReason: reason
    }));
    onClose();
    onRejected();
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white rounded-xl p-6 w-[450px] shadow-lg">

        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Motif du rejet
        </h2>

        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          rows="4"
          placeholder="Motif du rejet..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Annuler
          </button>

          <button
            onClick={handleRejectClaim(claimId,reason)}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Rejet..." : "Confirmer"}
          </button>

        </div>

      </div>
    </div>
  );
};
export default RejectClaimModal;