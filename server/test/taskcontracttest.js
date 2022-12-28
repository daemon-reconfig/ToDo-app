const {expect} =require("chai");
const {ethers} = require("hardhat");
describe("task contract", function(){
    let taskcontract;
    let taskContract;
    let owner;

    const NUM_TOTAL_TASK =5;
    
    let totalTask;
    beforeEach(async function() {
        taskcontract= await ethers.getContractFactory("taskcontract");
        [owner] = await ethers.getSigners();
        taskContract =await taskcontract.deploy();

        totalTasks =[];
        for(let i=0; i<NUM_TOTAL_TASK; i++){
            let task={
                'taskText': 'Task number:- '+i,
                'isDeleted': false
            };

            await taskContract.addTask(task.taskText, task.isDeleted);
            totalTasks.push(task);
        }
    });
    describe("Add Task", function(){
        it("should emit AddTask event", async function(){
            let task ={
                'taskText': 'New Task',
                'isDeleted': false,
            };
            await expect(await taskContract.addTask(task.taskText, task.isDeleted)).to.emit(taskContract, 'AddTask').withArgs(owner.address, NUM_TOTAL_TASK);
        });
    });
    describe("Get All Tasks", function(){
        it("should return the correct number of total tasks", async function(){
            const tasksFromChain= await taskContract.getMyTask();
            expect(tasksFromChain.length).to.equal(NUM_TOTAL_TASK);
             
        });
    });
    describe("Delete Task", function(){
        it("should emit delete task event", async function(){
            const TASK_ID=0;
            const TASK_DELETED = true;
            await expect(
                taskContract.deleteTask(TASK_ID, TASK_DELETED)
            ).to.emit(
                taskContract, 'DeleteTask'
            ).withArgs(
                TASK_ID, TASK_DELETED
            );
        });
    })
})