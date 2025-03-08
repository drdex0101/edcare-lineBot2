import { create } from 'zustand';

const useStore = create((set) => ({
  item: null,
  setItem: (newItem) => set({ item: newItem }),
  nannyInfo: null, // Add the new state
  setNannyInfo: (newNannyInfo) => set({ nannyInfo: newNannyInfo }), 
  orderId: null,
  setOrderId: (newOrderId) => set({ orderId: newOrderId }),
  memberInfo: null,
  setMemberInfo: (newMemberInfo) => set({ memberInfo: newMemberInfo }),
  kycData: null,
  setKycData: (newKycData) => set({ kycData: newKycData }),
  memberId: null,
  setMemberId: (newMemberId) => set({ memberId: newMemberId }),
}));

export default useStore;
