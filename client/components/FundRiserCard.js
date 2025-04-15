import React, { useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { contribute, createWithdrawRequest } from '../redux/interactions'
import { etherToWei } from '../helper/helper'
import { toastSuccess, toastError } from '../helper/toastMessage'

const colorMaker = (state) => {
  if (state === 'Fundraising') return 'bg-cyan-500'
  if (state === 'Expired') return 'bg-red-500'
  return 'bg-emerald-500'
}

const FundRiserCard = ({ props, pushWithdrawRequests, triggerRefresh }) => {
  const [btnLoader, setBtnLoader] = useState(false)
  const [amount, setAmount] = useState('')
  const dispatch = useDispatch()
  const crowdFundingContract = useSelector(state => state.fundingReducer.contract)
  const account = useSelector(state => state.web3Reducer.account)
  const web3 = useSelector(state => state.web3Reducer.connection)

  const contributeAmount = (projectId, minContribution) => {
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount < minContribution) {
      toastError(`Minimum contribution amount is ${minContribution} ETH`)
      return
    }

    setBtnLoader(projectId)
    const contributionAmount = etherToWei(numericAmount)

    const data = {
      contractAddress: projectId,
      amount: contributionAmount,
      account: account
    }

    const onSuccess = () => {
      setBtnLoader(false)
      setAmount('')
      toastSuccess(`Successfully contributed ${numericAmount} ETH`)
      // Trigger a refresh once the contribution is successful
      if (triggerRefresh) triggerRefresh()
    }

    const onError = (message) => {
      setBtnLoader(false)
      toastError(message)
    }

    contribute(crowdFundingContract, data, dispatch, onSuccess, onError)
  }

  const requestForWithdraw = (projectId) => {
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toastError(`Please enter a valid withdraw amount`)
      return
    }

    setBtnLoader(projectId)
    const contributionAmount = etherToWei(numericAmount)

    const data = {
      description: `${numericAmount} ETH requested for withdraw`,
      amount: contributionAmount,
      recipient: account,
      account: account
    }

    const onSuccess = (data) => {
      setBtnLoader(false)
      setAmount('')
      if (pushWithdrawRequests) pushWithdrawRequests(data)
      // Trigger a refresh once the withdraw request is successful
      if (triggerRefresh) triggerRefresh()
      toastSuccess(`Successfully requested withdraw of ${numericAmount} ETH`)
    }

    const onError = (message) => {
      setBtnLoader(false)
      toastError(message)
    }

    createWithdrawRequest(web3, projectId, data, onSuccess, onError)
  }

  return (
    <div className="card relative overflow-hidden my-4">
      <div className={`ribbon ${colorMaker(props.state)}`}>{props.state}</div>

      <Link href={`/project-details/${props.address}`}>
        <h1 className="font-sans text-xl text-gray font-semibold hover:text-sky-500 hover:cursor-pointer">
          {props.title}
        </h1>
      </Link>

      <p className="font-sans text-sm text-stone-800 tracking-tight mb-2">{props.description}</p>

      <div className="flex flex-col lg:flex-row">
        <div className="inner-card my-6 w-full lg:w-2/5">
          <p className="text-md font-bold font-sans text-gray">Targeted contribution</p>
          <p className="text-sm font-bold font-sans text-gray-600 mb-2">{props.goalAmount} ETH</p>
          <p className="text-md font-bold font-sans text-gray">Deadline</p>
          <p className="text-sm font-bold font-sans text-gray-600">{props.deadline}</p>
        </div>

        <div className="inner-card my-6 w-full lg:w-3/5">
          {props.state !== 'Successful' ? (
            <>
              <label className="text-sm text-gray-700 font-semibold">Contribution amount:</label>
              <div className="flex flex-row">
                <input
                  type="number"
                  step="any"
                  placeholder="Type here"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={btnLoader === props.address}
                  className="input rounded-l-md"
                />
                <button
                  className="button"
                  onClick={() => contributeAmount(props.address, props.minContribution)}
                  disabled={btnLoader === props.address}
                >
                  {btnLoader === props.address ? 'Loading...' : 'Contribute'}
                </button>
              </div>
              <p className="text-sm text-red-600 mt-1">
                <span className="font-bold">NOTE:</span> Minimum contribution is {props.minContribution} ETH
              </p>
            </>
          ) : (
            <>
              <p className="text-md font-bold font-sans text-gray">Contract balance</p>
              <p className="text-sm font-bold font-sans text-gray-600 mb-2">{props.contractBalance} ETH</p>

              {props.creator === account && (
                <>
                  <label className="text-sm text-gray-700 font-semibold">Withdraw request:</label>
                  <div className="flex flex-row">
                    <input
                      type="number"
                      step="any"
                      placeholder="Type here"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={btnLoader === props.address}
                      className="input rounded-l-md"
                    />
                    <button
                      className="button"
                      onClick={() => requestForWithdraw(props.address)}
                      disabled={btnLoader === props.address}
                    >
                      {btnLoader === props.address ? 'Loading...' : 'Withdraw'}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <p className="text-sm font-bold font-sans text-gray mt-2">
        Creator: <span className="break-all">{props.creator}</span>
      </p>

      {props.state !== 'Successful' && (
        <div className="w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div
            className="progress"
            style={{ width: `${Math.min(props.progress, 100)}%` }}
          >
            {props.progress}%
          </div>
        </div>
      )}
    </div>
  )
}

export default FundRiserCard
