export function useLoanModal() {
  const isOpen = useState('loan-modal', () => false)
  return {
    isOpen,
    open: () => { isOpen.value = true },
    close: () => { isOpen.value = false },
  }
}
