class BorrowersModel {

	constructor(){
		this._instance = null;
	}

	static getInstance(){
		
		if (this._instance === null){
			this._instance = new BorrowersModel();
		}

		return this._instance;
	}
	
	addNewBorrower(borrowerData){
		//
	}

}

BorrowersModel._instance = null;

export default BorrowersModel;