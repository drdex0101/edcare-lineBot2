import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      item: null,
      setItem: (newItem) => set({ item: newItem }),
      nannyInfo: null,
      setNannyInfo: (newNannyInfo) => set({ nannyInfo: newNannyInfo }), 
      orderId: null,
      setOrderId: (newOrderId) => set({ orderId: newOrderId }),
      memberInfo: null,
      setMemberInfo: (newMemberInfo) => set({ memberInfo: newMemberInfo }),
      kycData: null,
      setKycData: (newKycData) => set({ kycData: newKycData }),
      memberId: null,
      setMemberId: (newMemberId) => set({ memberId: newMemberId }),
      babyInfo: null,
      setBabyInfo: (newBabyInfo) => set({ babyInfo: newBabyInfo }),
      careData: null,
      setCareData: (newCareData) => set({ careData: newCareData }),
    }),
    {
      name: 'data-storage', // 在 localStorage 中的 key
      getStorage: () => localStorage, // 使用 localStorage 持久化
    }
  )
);

export default useStore;
