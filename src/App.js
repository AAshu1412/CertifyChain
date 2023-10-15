import './App.css';
import React from "react";
import { useState,useEffect } from 'react';

import {ethers} from "ethers";
import certificate from "./contracts/certificate.sol/certificate.json";
const certificateAddress="0x4aF28d9e9e056620bbB78d8870b1942cc9B34954";
console.log(certificateAddress, "Counter ABI: ", certificate.abi);

function App() {
 
  const [_issuerAddress,set_issuerAddress]=useState("");
  const[_organisationName,set_organisationName]=useState("");
  const [_companyRegisteredNumber,set_companyRegisteredNumber]=useState(0);

  const [remove_issuerAddress,setRemove_issuerAddress]=useState("");

  const [peopleAddress,setPeopleAddress]=useState("");
  const [certificateID,setCertificateID]=useState(0);
  const [_typeOfCertificate,set_typeOfCertificate]=useState("");

  // const [number,setNumber]=useState(0);

  const [rCertificateHolder,set_rCertificateHolder]=useState("");
  const [CertificateHolder,setCertificateHolder]=useState(null);

  const [rCertificateIssuer,set_rCertificateIssuer]=useState("");
  const [CertificateIssuer,setCertificateIssuer]=useState(null);

/////////////////////////////////////////////////////////////////////////////////////////////////////
const Wallet =async ()=>{

  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
    console.log(signer.getAddress());
}

const connectionAllowingIssuer=async()=>{
  const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(certificateAddress, certificate.abi, signer);
      const transaction = await contract.allowingIssuer(_issuerAddress,_organisationName,_companyRegisteredNumber);
      transaction.wait();
 }

 const connectionRemovingIssuer=async()=>{
  const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(certificateAddress, certificate.abi, signer);
      const transaction = await contract.removingIssuer(remove_issuerAddress);
      transaction.wait();
 }

 const connectionAllowingPeople=async()=>{
  const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(certificateAddress, certificate.abi, signer);
      const transaction = await contract.allowingPeople(peopleAddress,certificateID,_typeOfCertificate);
      transaction.wait();
 }

 const connectionAllowedMint=async(num)=>{
  const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(certificateAddress, certificate.abi, signer);
      const transaction = await contract.allowedMint(num);
      transaction.wait();
 }

 const returnCertificateHolder = async()=>{
  const provider = new ethers.BrowserProvider(window.ethereum);
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      // const signer = provider.getSigner();
      const contract = new ethers.Contract(certificateAddress, certificate.abi, provider);
      const returnHolderDetails = await contract.getDetailsOfCertificateHolder(rCertificateHolder);
      console.log(returnHolderDetails.access);
       return(setCertificateHolder(returnHolderDetails));
 }

 const returnCertificateIssuer = async()=>{
  const provider = new ethers.BrowserProvider(window.ethereum);
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      // const signer = provider.getSigner();
      const contract = new ethers.Contract(certificateAddress, certificate.abi, provider);
      const returnIssuerDetails = await contract.getDetailsOfCertificateIssuer(rCertificateIssuer);
      console.log(returnIssuerDetails);
       return(setCertificateIssuer(returnIssuerDetails));
 }



///////////////////////////////////////////////////////////////////////////////////////////////////////// 
 function setAllowingIssuer1(event){
      set_issuerAddress(event.target.value);
  }

  function setAllowingIssuer2(event){
    set_organisationName(event.target.value);
}

function setAllowingIssuer3(event){
  set_companyRegisteredNumber(event.target.value);
}
//////////////////////////////////////////////////////////

 function setRemovingIssuer(event){
   setRemove_issuerAddress(event.target.value);
 }

/////////////////////////////////////////////////////////

  function setAllowingPeople1(event){
     setPeopleAddress(event.target.value);
  }

  function setAllowingPeople2(event){
    setCertificateID(event.target.value);
  }

  function setAllowingPeople3(event){
    set_typeOfCertificate(event.target.value);
  }

////////////////////////////////////////////////////////

 function getHolderDetails(event){
      set_rCertificateHolder(event.target.value);
 }

////////////////////////////////////////////////////////

 function getIssuerDetails(event){
  set_rCertificateIssuer(event.target.value);
 }

 


  return (
    <div className="App">
    <div><h1>CERTIFYCHAIN</h1></div><br/><br/>
    <hr></hr>
    <div>
    <h1>CONNECT TO METAMASK</h1>
    <button onClick={Wallet}>Connect Wallet</button><br/><br/>
    </div>
    <hr></hr>
    <div>
      <h1>AUTHORIZE A Valid ISSUER</h1>
      <h3>Enter the Issuer Address : <input type="text" onChange={setAllowingIssuer1} placeholder='Wallet Address'></input></h3>
      <h3>Enter the Issuer Organisztion Name : <input type="text" onChange={setAllowingIssuer2} placeholder='Organization Name'></input></h3>
      <h3>Enter the Issuer Organisztion Registration No. : <input type="number" onChange={setAllowingIssuer3} placeholder='Organization Reg. No.'></input></h3>
      <button onClick={connectionAllowingIssuer}>Give Access</button><br/><br/>
    </div>
    <hr></hr>
    <div>
      <h1>REMOVING FAKE ISSUER</h1>
      <h3>Enter the Issuer Address : <input type="text" onChange={setRemovingIssuer} placeholder='Wallet Address'></input></h3>
      <button onClick={connectionRemovingIssuer}>Remove Access</button><br/><br/>
    </div>
    <hr></hr>
    <div>
      <h1>ISSUER VALIDATING THE CANDIDATE</h1>
      <h3>Enter the Candidate Address :  <input type="text" onChange={setAllowingPeople1} placeholder='Wallet Address'></input></h3>
      <h3>Enter the Certificate ID : <input type="number" onChange={setAllowingPeople2} placeholder='Certificate ID'></input></h3> 
      <h3>Enter the Certificate Type : <input type="text" onChange={setAllowingPeople3} placeholder='Certificate Type'></input></h3>    
      <button onClick={connectionAllowingPeople}>Granting Access</button><br/><br/>
    </div>
    <hr></hr>
    <div>
      <h1>VALIDATED CANDIDATE CLAIM THEIR CERTIFICATE</h1>
      <div id="grid">
        <div className='blocks'style={{marginLeft:"250px",paddingBottom:"15px"}}><img src="https://blockgeeks.com/wp-content/uploads/2019/04/Certificate-2.jpg.webp" alt="certificate_1" width="250" height="150" style={{paddingBottom:"15px"}}/><br></br>
        <h3>Blockchain Certificate</h3>
        <button onClick={()=>connectionAllowedMint(0)}>CLAIM</button>
        </div>
        <div className='blocks' style={{paddingBottom:"15px"}}><img src="https://d3srxiunz7lgh6.cloudfront.net/tbf5fi43he9naxy9t38n0txp6tby" alt="certificate_2" width="250" height="150" style={{paddingBottom:"15px"}}/><br></br>
        <h3>Cyber Security Certificate</h3>
        <button onClick={()=>connectionAllowedMint(1)}>CLAIM</button>
        </div>
        <div className='blocks' style={{marginRight:"250px",paddingBottom:"15px"}}><img src="https://in.edology.com/images/aiml-certificate-ibm-new.png" alt="certificate_3" width="250" height="150" style={{paddingBottom:"15px"}}/><br></br>
        <h3>AIML Certificate</h3>
        <button onClick={()=>connectionAllowedMint(2)}>CLAIM</button>
        </div>
      </div><br/><br/>
    </div>
    <hr></hr>
    <div>
        <h1>CERTIFICATE HOLDER DETAILS</h1> 
        <h3>Enter the Holder Address : <input type="text" onChange={getHolderDetails} placeholder='Wallet Address'></input></h3>
        <button onClick={returnCertificateHolder}>Get DETAILS</button><br/><br/>
        <h2>Details : </h2> 
        {CertificateHolder?.access && <p>Have Access</p>} 
        {CertificateHolder?.certificateIssuer} <br/>
        {CertificateHolder?.typeOfCertificate}
    </div>    
    <hr ></hr>
    <div>
    <h1>CERTIFICATE ISSUER DETAILS</h1> 
        <h3>Enter the ISSUER Address : <input type="text" onChange={getIssuerDetails} placeholder='Wallet Address'></input></h3>
        <button onClick={returnCertificateIssuer}>Get DETAILS</button><br/><br/>
        <h2>Details : </h2> {CertificateIssuer?.access && <p>Have Access</p>} {CertificateIssuer?.issuerAddress} {CertificateIssuer?.organisationName} {CertificateIssuer?.companyRegisteredNumber}
    </div>
    <hr style={{borderWidth:"5px",borderColor:"black"}}></hr>
    </div>
  );
}

export default App;
