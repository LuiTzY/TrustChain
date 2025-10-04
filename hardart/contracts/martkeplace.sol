// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint id;
        string name;
        uint price;
        address payable seller;
        bool sold;
    }

    uint public itemCount = 0;
    mapping(uint => Item) public items;

    event ItemListed(uint id, string name, uint price, address seller);
    event ItemPurchased(uint id, address buyer, uint price);

    function listItem(string memory _name, uint _price) public {
        require(_price > 0, "Price must be > 0");
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _price, payable(msg.sender), false);
        emit ItemListed(itemCount, _name, _price, msg.sender);
    }

    function buyItem(uint _id) public payable {
        Item storage item = items[_id];
        require(item.id > 0 && item.id <= itemCount, "Item does not exist");
        require(!item.sold, "Item already sold");
        require(msg.value == item.price, "Incorrect price");

        item.seller.transfer(msg.value);
        item.sold = true;

        emit ItemPurchased(_id, msg.sender, item.price);
    }
}
