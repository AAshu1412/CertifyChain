//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract certificate is ERC1155 {

    address private owner;

    error throwError(string);

    struct issuer{
        bool access;
        address issuerAddress;
        string organisationName;
        uint companyRegisteredNumber;
    }

    struct people{
        bool access;
        uint[] id;
        address certificateIssuer;
        string typeOfCertificate;
    }
    
    mapping (address=>people) public allowedPerson;
    mapping (address=>issuer) public allowedIssuer; 

        constructor()
        ERC1155("ipfs://QmPzyLCmiJaNHwdton5Zojsn4v8bRZape5RkNGd63dd1A2/")
        {
         owner=msg.sender;
        }
       

        modifier ownerOfContract{
            require(owner==msg.sender,"You are not the owner of this contract");
            _;
        }     

    function setURI(string memory newuri) public ownerOfContract {
        require(owner==msg.sender || allowedIssuer[msg.sender].access==true,"You are not allowed to set URI");
        _setURI(newuri);
    }

    function allowingIssuer(address _issuerAddress,string memory _organisationName,uint _companyRegisteredNumber) public ownerOfContract{
        allowedIssuer[_issuerAddress].access=true;
        allowedIssuer[_issuerAddress].issuerAddress=_issuerAddress;
        allowedIssuer[_issuerAddress].organisationName=_organisationName;
        allowedIssuer[_issuerAddress].companyRegisteredNumber=_companyRegisteredNumber;
    } 

    function removingIssuer(address _issuerAddress) public ownerOfContract{
         allowedIssuer[_issuerAddress].access=false;
    }

    function allowingPeople(address peopleAddress,uint certificateID,string memory _typeOfCertificate) public {
        require(allowedIssuer[msg.sender].access,"You are not a verified issuer");
         allowedPerson[peopleAddress].access=true;
         if(allowedPerson[peopleAddress].id.length==0){
             allowedPerson[peopleAddress].id.push(certificateID);
         }
         else{
            checkingID(peopleAddress, certificateID);
         }
         allowedPerson[peopleAddress].certificateIssuer=msg.sender;
         allowedPerson[peopleAddress].typeOfCertificate=_typeOfCertificate;
    }

    function checkingID (address peopleAddress,uint certificateID) private ownerOfContract{  
            for (uint i=0;i<allowedPerson[peopleAddress].id.length;i++){
                if(allowedPerson[peopleAddress].id[i]!=certificateID){
                   allowedPerson[peopleAddress].id.push(certificateID);
                }  
         }
    } 

    function allowedMint(uint256 id)
        public
    {
        require(allowedPerson[msg.sender].access,"You are not allowed to access certificate");
        bool iOwn = false;
        for (uint i=0;i<allowedPerson[msg.sender].id.length;i++){
                if(allowedPerson[msg.sender].id[i]==id){
                   allowedPerson[msg.sender].id[i]==id;
                   iOwn = true;
                }  
         }
         if(!iOwn){
            revert throwError("You are minting the wrong certificate");
         }
        _mint(msg.sender, id, 1,'');
    }

function getDetailsOfCertificateHolder(address certificateHolderAddress) public view returns(people memory){
   return allowedPerson[certificateHolderAddress];
}

function getDetailsOfCertificateIssuer(address certificateIssuer) public view returns(people memory){
   return allowedPerson[certificateIssuer];
}

function uri(uint256 id) public view virtual override returns (string memory) {
        // require(exists(id),"ID does not exist");
        return string(abi.encodePacked(super.uri(id),Strings.toString(id),".json"));
    }

}