// SPDX-License-Identifier: NONE
pragma solidity 0.8.14;

contract DonationContract {
    address payable public owner;
    uint public totalDonations;

    constructor() {
        owner = payable(msg.sender);
    }

    /*function donate(uint ) public payable {
        require(msg.value > 0, "Donation must be greater than zero");
        totalDonations += msg.value;
    }*/

    function donate() public payable {
    (bool success,) = owner.call{value: msg.value}("");
    require(success, "Failed to send money");
  }

    function withdraw() public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds");
        owner.transfer(totalDonations);
        totalDonations = 0;
    }
}