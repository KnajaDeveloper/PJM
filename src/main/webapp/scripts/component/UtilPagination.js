var UtilPaggination = new function(){
	var _this = this;
	var jsonSize={size:0};
	var optionJsonData = {url:{},data:{}};
	var optionJsonSize = {url:{},data:{}};
	var currentPage = 1;
	var maxPage = 1;
	var maxData = 0;
	var limitData = 15;
	var idPagging="";
	var startDisplayRecords = 0;
	var toDisplayRecords = 0;
	var isCloseButton = false;

	this.getSize = function(){
		return jsonSize;
	};

	this.getStartDisplayRecords = function(){
		return startDisplayRecords;
	};

	this.getToDisplayRecords = function(){
		return toDisplayRecords;
	};

	this.getOptionJsonData = function () {
		return optionJsonData;
	};

	this.setOptionJsonData = function (json) {
		optionJsonData = json;
	};

	this.getOptionJsonSize = function () {
		return optionJsonSize;
	};

	this.setOptionJsonSize = function (json) {
		optionJsonSize = json;
	};

	this.getCurrentPage = function () {
		return currentPage;
	};

	this.setCurrentPage = function (current) {
		currentPage = current;
	};

	this.getMaxPage = function () {
		return maxPage;
	};

	this.setMaxPage = function (max) {
		maxPage = max;
	};

	this.getLimitData = function () {
		return limitData;
	};

	this.setLimitData = function (limit) {
		limitData = limit;
	};

	this.updateLabel = function () {
		$(idPagging+"MaxPage").text(maxPage);

		if(jsonSize.size == 0){
			$(idPagging+"CurrentPage").val(0);
		}
		else
		{
			$(idPagging+"CurrentPage").val(currentPage);	
		}
        
        if(currentPage > 1) 
        {
                $(idPagging+ "StartDisplayRecords").text(startDisplayRecords+1);
        }
        else 
        {
                $(idPagging+ "StartDisplayRecords").text(startDisplayRecords);
        }

        $(idPagging+ "ToDisplayRecords").text(toDisplayRecords);
        $(idPagging+ "DisplayTotalRecord").text(maxData);        
	}

	this.search = function (object) {
		
		var jsonData = AjaxUtil.get(optionJsonSize);
		jsonSize = jsonData;
		maxData = jsonData.size;
		maxPage = Math.ceil(maxData/limitData);
		object.setCurrentPage(1);
		this.loadData(object,0,limitData);
		currentPage = object.getCurrentPage();
		this.enabled();


	}

	this.next = function(object) {
	    if(currentPage < maxPage)
	    {
	        currentPage++;
	        var firstResult = (currentPage - 1)*limitData;
	        var maxResult = (currentPage*limitData);
	        this.loadData(object,firstResult,limitData);
	    }

	};

	this.prev = function(object) {
		if(currentPage > 1)
	    {
	        currentPage--;
	        var firstResult = (currentPage - 1)*limitData;
	        var maxResult = (currentPage*limitData);
	        this.loadData(object,firstResult,limitData);
	    }
	};

	this.first = function(object) {
		if(maxPage == 0 ||currentPage == 1){
		        return;
		}
	    
	    currentPage = 1;
	    var firstResult = (currentPage - 1)*limitData;
	    var maxResult = (currentPage*limitData);
        this.loadData(object,firstResult,limitData);
	};

	this.last = function(object) {
	    if(maxPage == 0 || currentPage == maxPage){
	        return;
	    }
	    currentPage = maxPage;
	    var firstResult = (currentPage - 1)*limitData;
	    var maxResult = (currentPage*limitData);
        this.loadData(object,firstResult,limitData);
	};

	this.loadPage = function (page,object){
		if(page > maxPage){
			return;
		}
		else
		{
	        currentPage = page;
	        var firstResult = (currentPage - 1)*limitData;
	        var maxResult = (currentPage*limitData);
	        this.loadData(object,firstResult,limitData);
		}
	};

	this.loadData = function (object,firstResult,maxResult) {	
		var temp = optionJsonData;
		var defualt = {
			firstResult:firstResult,
			maxResult:maxResult
		};
		
		$.extend(temp.data,defualt);
		var jsonData = AjaxUtil.get(temp);
		if(maxData == 0){
			startDisplayRecords = 0;
			toDisplayRecords = 0;
		}
		else
		{
			startDisplayRecords = firstResult;
			if(startDisplayRecords == 0){
				toDisplayRecords = startDisplayRecords + jsonData.length;
				startDisplayRecords = 1;
			}
			else
			{
				startDisplayRecords = firstResult;
				toDisplayRecords = startDisplayRecords+jsonData.length;
			}
		
			
		}

		object.loadTable(jsonData);	
		this.updateLabel();	
	};

	this.loadTable = function(jsonData) {
		object.loadTable(jsonData);
	};

	this.setEventPaggingBtn =function (pagging,object) {
		idPagging = "#"+pagging;
		$(idPagging+"BtnFirst").on('click',function() {
			_this.first(object);
		});

		$(idPagging+"BtnPrev").on('click',function () {
			_this.prev(object);
		});

		$(idPagging+"BtnNext").on('click',function() {
			_this.next(object);
		});
		
		$(idPagging+"BtnLast").on('click',function() {
			_this.last(object);
		});	

		this.disabled();

	};

	this.disabled = function () {
		$(idPagging+"BtnFirst").attr('disabled','disabled');
		$(idPagging+"BtnPrev").attr('disabled','disabled');
		$(idPagging+"BtnNext").attr('disabled','disabled');
		$(idPagging+"BtnLast").attr('disabled','disabled');
		$(idPagging+"CurrentPage").attr('disabled','disabled');	
		isCloseButton = true;
	};

	this.enabled = function () {
		if(isCloseButton){
			$(idPagging+"BtnFirst").removeAttr('disabled');
			$(idPagging+"BtnPrev").removeAttr('disabled');
			$(idPagging+"BtnNext").removeAttr('disabled');
			$(idPagging+"BtnLast").removeAttr('disabled');
			$(idPagging+"CurrentPage").removeAttr('disabled');
			isCloseButton = false;
		}
	
	};
};
