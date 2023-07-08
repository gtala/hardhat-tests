const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () { 
  let contractStorage

  beforeEach(async () => {
    const Storage = await ethers.getContractFactory("Storage");  
     contractStorage = await Storage.deploy();
  });

  describe("Store()", ()=> {

    it("Debería llamar a la funcion store y guardar el valor 1", async function () {
      await contractStorage.store(1)
      const value = await contractStorage.retrieve()
      expect(value).to.equal(1)
    });

    it("Debería llamar a la funcion store y guardar el valor 100", async function () {
      await contractStorage.store(100)
      const value = await contractStorage.retrieve()
      expect(value).to.equal(100)
    });

  })

  describe("retrive()", ()=>{

    it("Debería devolver el valor 0 si nadie llamo al la funcion store", async ()=> {
      const value = await contractStorage.retrieve()
      expect(value).to.equal(0)
    })


  })


  describe("deposit()", ()=>{

    it("Deberia depositar 250 WEI", async ()=> {
      let cantidadEth = BigInt(250)

      const balanceAntesDeposito =  await ethers.provider.getBalance(contractStorage.target)
      expect(balanceAntesDeposito).to.equal(0)
    
      await contractStorage.deposit({ value : cantidadEth})

      const balanceDespuesDeposito =  await ethers.provider.getBalance(contractStorage.target)
      expect(balanceDespuesDeposito).to.equal(250)
  
    })

    it("Deberia fallar si alguien deposita 0 wei", async ()=> {
      const txDeposit =  contractStorage.deposit({ value : 0})
      await expect(txDeposit).to.revertedWith("el valor depositado tiene que ser mayor a 0")
    })


  })

  
})