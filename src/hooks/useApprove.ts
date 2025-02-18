import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { updateUserAllowance, fetchFarmUserDataAsync, fetchBattlefieldUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useMasterchef, useCake, useSousChef, useLottery, useBattlefield, useKnightsDefiNFTs, useSquire, useKnight, useLegend, useTable } from './useContract'

// Approve a Battlefield
export const useBattlefieldApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const battlefieldContract = useBattlefield()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, battlefieldContract, account)
      dispatch(fetchBattlefieldUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, battlefieldContract])

  return { onApprove: handleApprove }
}

// Approve Kdfn Nft Purchase
export const useKdfnSquireApprove = () => {
  const { account }: { account: string } = useWallet()
  const kdfnContract = useKnightsDefiNFTs()
  const contract = useSquire()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(contract, kdfnContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, contract, kdfnContract])

  return { onApprove: handleApprove }
}

export const useKdfnKnightApprove = () => {
  const { account }: { account: string } = useWallet()
  const kdfnContract = useKnightsDefiNFTs()
  const contract = useKnight()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(contract, kdfnContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, contract, kdfnContract])

  return { onApprove: handleApprove }
}

export const useKdfnLegendApprove = () => {
  const { account }: { account: string } = useWallet()
  const kdfnContract = useKnightsDefiNFTs()
  const contract = useLegend()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(contract, kdfnContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, contract, kdfnContract])

  return { onApprove: handleApprove }
}
export const useKdfnTableApprove = () => {
  const { account }: { account: string } = useWallet()
  const kdfnContract = useKnightsDefiNFTs()
  const contract = useTable()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(contract, kdfnContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, contract, kdfnContract])

  return { onApprove: handleApprove }
}

export const useKdfnNftPurchaseApprove = (contract: Contract) => {
  const { account }: { account: string } = useWallet()
  const kdfnContract = useKnightsDefiNFTs()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(contract, kdfnContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, contract, kdfnContract])

  return { onApprove: handleApprove }
}

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const masterChefContract = useMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}


// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account }: { account: string } = useWallet()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWallet()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(spenderAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return onApprove
}
