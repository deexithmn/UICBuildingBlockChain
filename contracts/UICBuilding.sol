pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract UICBuilding {
    
    address  owner;
    mapping(uint => Building) public building;
    uint public totalBuildings;
    
    modifier onlyOwner {
        require (msg.sender == owner);
        _;
    }
    struct Building{
        string buildingName;
        string buildingNumber;
        string buildingAddress;
    }
    
    constructor ()  public {
        owner = msg.sender;
    }
    function addBuilding(string memory _buildingName, string memory _buildingNumber, string memory _buildingAddress) public onlyOwner{
        totalBuildings++;
        building[totalBuildings] = Building(_buildingName, _buildingNumber, _buildingAddress);
    }
    function getBuilindingAddress(uint index) view public returns (Building memory){
        return building[index];
    }
}