import { motion, AnimatePresence } from "framer-motion";

interface ConfirmPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

export default function ConfirmPurchaseModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: ConfirmPurchaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 w-[90%] max-w-md p-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Icono decorativo */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
              Confirmar compra
            </h2>

            {/* Descripción */}
            <p className="text-sm text-slate-300 mb-8 leading-relaxed">
              ¿Deseas comprar{" "}
              <span className="font-semibold text-blue-400">{productName}</span>{" "}
              usando criptomonedas?
            </p>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-slate-800/50 text-slate-300 font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-700 hover:border-slate-600"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
