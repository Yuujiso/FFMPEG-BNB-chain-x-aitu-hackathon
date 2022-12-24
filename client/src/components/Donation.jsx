import { ethers } from "ethers";
import { useEffect, useState } from "react";

const DonationForm = ({ account }) => {
  const [amount, setAmout] = useState("");

  const provider = new ethers.providers.Web3Provider(
    window.web3.currentProvider
  );
  const signer = provider.getSigner();

  const contractAddress = "0xF9db0BA09F5E9B5F7f0aD511202FcD446FFf90Ed";
  const contractABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
      name: "donate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalDonations",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const handleSubmit = async (event) => {
    if (!account) {
      alert("You should sign in");
      return;
    }

    console.log(`amout = ${amount}`);
    event.preventDefault();
    let sum = Number(amount); /* 10 ** 18 */
    sum = Math.floor(sum);
    const tx = await signer.sendTransaction({
      to: "0xF9db0BA09F5E9B5F7f0aD511202FcD446FFf90Ed",
      value: ethers.utils.parseEther(amount),
      gasLimit: ethers.utils.hexlify(139.28 * 10 ** 6),
      gasPrice: 42,
    });
    await tx.wait();
    console.log(`Transaction hash: ${tx.hash}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-section">
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmout(e.target.value)}
        />
      </div>
      <button type="submit">Donate</button>
    </form>
  );
};

export default DonationForm;
