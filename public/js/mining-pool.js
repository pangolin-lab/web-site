/**
 * MetaMask Support
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *	 \o/\ /---~\\ ~}}
 *     _//    _// ~}
 * 
 * Copyright (c) 2019 PPL,pangolin-team
 * E-mail : developer-team@pangolink.org
 * https://github.com/pangolin-lab/web-site
 *
 */
BootstrapTable.prototype.initToolbar = function () {
  //#定义按钮，这个位置决定前端显示按钮的顺序
  if (this.options.showSearchButton) {
    // html.push(sprintf('<button class="btn btn-default" type="button" name="refresh" id="search" aria-label="refresh" title="搜索">',
    // this.options.formatRefresh()),
    // sprintf('搜索'),'</button>');
  }

  //#触发上传数据到服务端，并重载列表
  if (this.options.showSearchButton) {
    this.$toolbar.find('input[name="search_text"]')
    .off('keypress').on('keypress', function(e){
    	console.log(e.keyCode);
    	if(e.keyCode == 13){

    	  return $.proxy(this.refresh, this);
    	}
    	
    });
  }
}

let MPTBOpts={
  pagination:true,
  search: true,
  pageSize:2,
  cardView:true,
  dataCache:false,
  showSearchButton: true,
  queryParams:miningPoolAddressSearch,
  columns:[
	{field:'id',title:'Addresss'},
	{field:'nodeName',title:'名称'},
	{field:'mortgageToken',title:'抵押数量'},
	{field:'remark',title:'简介'}
  ]
};

/**
 * OK
 *
 */
function miningPoolAddressSearch(params){
  //js
  let param = {
    csrfmiddlewaretoken :$("input[name='csrfmiddlewaretoken']").val(),
    pageNumber: params.pageNumber,
    pageSize: params.pageSize,
    search:$("input[ name='search_text' ] ").val(), //定义传输的搜索参数
    order:params.sortOrder,
    sort:params.sortName
  };

  return param;
}

MPTBOpts.url='minigpool-list.json';
var miningPoolTable = $('#miningPoolTable').bootstrapTable(MPTBOpts);


