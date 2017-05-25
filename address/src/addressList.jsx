/*地址管理*/

import React from "react";
import ReactDOM from "react-dom";

function dialogTlp(config) {
    var html = [];
    var btn = [];
    var cls = config.cls || '';
    if (config.btn.length === 1) {
        btn.push('<ul class="full">');
    } else {
        btn.push('<ul class="full">');
    };
    $.each(config.btn, function(i, item) {
        btn.push('<li><div class="btn ' + item.color + ' btn-dialog btn-block">' + item.text + '</div></li>');
    });
    btn.push('</ul>');
    html.push('<div id="' + config.did + '" class="dialog ' + cls + '">');
    html.push('<div class="dialog-content dialog-body ' + config.class + '">');
    html.push('<div class="bd"><p>' + config.text + '</p></div><div class="action btn-area">');
    html.push(btn.join(''));
    html.push('</div></div></div>');
    return html.join('');
};

//弹窗
function dialog(opt, callback) {
    let def = {
        class: 'info',
        btn: [{
            text: '确定',
            color: 'btn-primary',
            action: closed
        }],
        auto: ''
    };
    const config = $.extend({}, def, opt);

    config.did = 'dialog';
    renderDialog();

    function renderDialog() {
        $('body').append(dialogTlp(config));

        $('#' + config.did).find('.action').find('li').each(function(i) {
            $(this).off().on('click', function() {
                if (typeof config.btn[i].action === 'function') {
                    config.btn[i].action();
                };
                closed();
            });
        });

        if (!!config.auto) {
            autoClose();
        }

    };
    //自动关闭
    function autoClose(callback) {
        var closedTimer = setTimeout(function() {
            closed();
        }, config.auto);
    }

    function closed() {
        if ($('#' + config.did).length === 0) return;
        $('#' + config.did).detach();
        if (!!callback) {
            callback();
        }
    };
};

//data-link 
function datalink(ev) {
    ev.stopPropagation();
    window.location.href = $(this).data('link');
};
//跳转到目标链接
$('#view').on('click', '[data-link]', datalink);
//返回上一页
$('#view').on('click','.topbar-back-go',function(){
      
});

//rAF();
//定义地址默认值
let nodata = {
    id: '',
    receive: '',
    receiveTel: '',
    receivePhone: '',
    receiveEmail: '',
    province: '',
    city: '',
    county: '',
    detailAddress: '',
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    isDefault: '1',
    btnType:0
}
/*
 * @author wangna
 * @description 字符替换 后期再扩展
 * @param {s：需要替换的} 
 * @return 替换后的字符
 */
function replaceChart(s) {
   return s = s.replace(/ /g,"&nbsp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/"/g,"&quot;").replace(/\n/g,"<br/>");
};
//删除确认组件
class ConfirmBox extends React.Component {
    constructor(){
        super();
        this.state = {
            open: ''
        };
    }
    componentDidMount(){
        //取消删除
        $('._cancel').click(function(){
            $('#view').removeClass('panel-open');
            $('.mask').addClass('hide');
        });
        $('._delete').click(function(){
            $('#view').removeClass('panel-open');
            $('.mask').addClass('hide');
        });

    }
    handleCancel() {
        this.props.callbackParent();
    }
    handleDelect() {
        this.props.deleteAdrItem();
    }
    render() {
            //声明config开启状态
            let open = this.props.open;

            let className;
            let classMask;

            if (open) {
                className = 'panel-sku in';                
            } else {
                className = 'panel-sku out hide';              
            }
            return ( 
                < div id = "panel"
                className = { className } >
                < div className = "product" >
                是否确认删除该地址！ < /div> < br / >
                <div className="action">
                < div className = "_cancel" ref="giraffe" data-cancel-btn onClick = { this.handleCancel.bind(this) } > 取消 < /div> 
                < div className = "_delete" ref="giraffe" data-cancel-btn onClick = { this.handleDelect.bind(this) } > 删除 < /div>
                </div>
                < /div>                    
            );
    }

};
//输入相关项启动确认按钮
function isHigt(){
    var _self = this;
    let objs = $('[data-vform]').find('.inbox');
    let ishigh = _.every(objs,function(item){
        return $.trim($(item).val()) !=="";
    });

    if(ishigh === true){
       return true;  
    }else{
        return false;
    }  
}
//展开子面板
function subPanel() {
    var target = null;
    var targetPanel = null;
    function spIn() {
        target = $(this).data('target');
        targetPanel = $('#selectorPanel');

        targetPanel.removeClass('hide');

        setTimeout(function() {
                $("#view").addClass('panel-open');
        }, 201);
    };
    function spOut() {

        targetPanel = $('#selectorPanel');
            if (targetPanel === null) {
                return;
        };
            
        $("#view").removeClass('panel-open');

        setTimeout(function() {
            targetPanel.addClass('hide');
            $('[data-mask]').detach();
            target = null;
            targetPanel = null;
        }, 201);
    };
    function spConfrim() {};
        return {
            spIn: spIn,
            spOut: spOut,
            spConfrim: spConfrim
        };
};

//新建/编辑收货人信息组件
//var ReceiveEditBox = React.createClass({
class ReceiveEditBox extends React.Component {
    constructor() {
            super();
        }
    componentDidMount(){
        var node = this.refs.giraffe; 
         // $('[data-edit-btn]').click(subPanel().spIn);
        $('#view').on('click','[data-edit-btn]',subPanel().spIn);
        $('[data-creat-address]').click(subPanel().spIn);
          //删除地址
        $('#view').on('click','[data-del-btn]',function(){
            if(!$('#view').hasClass('panel-open')){
                $('#view').addClass('panel-open');
                $('.mask').removeClass('hide');
            }else{
                $('#view').removeClass('panel-open');
            }
        });         

        $('.mask').click(function(){
            $('#view').removeClass('panel-open');
             $('.mask').addClass('hide');
             $('#panel').addClass('out').addClass('hide');
          });
          //关闭地址编辑面板
          $('[data-close]').click(subPanel().spOut);

        var selectArea2 = new MobileSelectArea();
          selectArea2.init({trigger:'#txt_area2',value:$('#txt_area2').data('value'),data:'getAllAddress.js',eventName:'click'});
    }//保存收货地址
    handleSave() {
            this.props.callbackSave();
        }
        //修改data数据
    handleChange(event) {
            this.props.changeTodoState(event.target.value, event.target.name)
        }
    handleChange2(){

    }

    handleSelectCity(event){
        var node = this.refs.giraffe;   

    }
    render() {
        var data = this.props.cachData;

        let citydata = data.province+" "+data.city+" "+data.county;
        let citycode = data.provinceCode+","+data.cityCode+","+data.countyCode;
      //  console.log(this.props)
      
        let optionTitle = this.props.optionType==0?'创建收货人地址':'编辑收货人地址';
        let isbtn = this.props.btnType === 1? 1:0;
        let saveBtnStyle ='btn btn-disabled  btn-block';

        if(isbtn === 1){//判断按钮状态
            saveBtnStyle = 'btn btn-primary  btn-block';
        }else{
            saveBtnStyle = 'btn btn-disabled  btn-block';
        }
        return ( 

            < form ref="giraffe" data-vform>

                < div className = "page hasfootbar" >
                < div className = "topbar normal regsiter" >
                < div className = "topbar-text" > {optionTitle} < /div> 
                < div className = "topbar-btn left" > < i className = "iconfont icon-arrow-left" onClick ={this.props.closePanel} ref="giraffe" data-close> < /i></div >
                < /div> 
                < div className = "newaddress"  >
                < ul >
                < li > < span className="lib" > 收货人： < /span> 
                < input type = "text" placeholder = " " maxLength="20" className="inbox" ref="giraffe" name = "receive" value = {data.receive} onChange = {this.handleChange.bind(this)} /> 
                < /li> 
                < li > < span  className="lib" > 手机号码： < /span> 
                < input type = "text"  className="inbox" ref="giraffe" maxLength="20" placeholder = "" name = "receiveTel" value = {data.receiveTel} onChange = {this.handleChange.bind(this) }  type="tel" /> 
                < /li>
                < li> < i className = "iconfont icon-arrow-right fr" > < /i><span  className="lib">所在地区：</span >
      
                 < p > <input type="text" id="txt_area2" ref="giraffe" value={citydata} data-value="" data-code={citycode} onChange = {this.handleChange2 } />< /p> 
                < /li>            
                < li > < span  className="lib"> 详细地址： < /span> 
                < input type = "text"  className="inbox" name = "detailAddress" ref="giraffe" maxLength="50"  placeholder = "街道、楼门号" value = { data.detailAddress } onChange = { this.handleChange.bind(this) }/> < /li>             
                < /ul> 
                < /div> 
                < /div> 
                < div className = "footbar footbar-default" >
                < div className = "action" >
                < div className = { saveBtnStyle } save-btn ref="giraffe" onClick = { this.handleSave.bind(this) } > 保存
                < /div> 
                < /div> 
                < /div> 
            < /form>


        );
    }
};
/*Warning: Failed form propType: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`. Check the render method of `t`.*/
//选择城市
var CreateBox = React.createClass({
  handleCreat: function() {
      this.props.callbackCreate();
  },
  render: function() {
    return (
      < div className = "btn btn-primary btn-block" ref="giraffe" data-creat-address=""  
      onClick= { this.handleCreat} > +新建地址  
      < /div> 
      );
  }
});
//地址列表组件（可以将item单独为一个组件）
var AddressList = React.createClass({
    getInitialState: function() {
        return {
            loading: true, //加载状态
            error: null, //
            data: null, //地址列表数据
            receiveData: null,
            open: false, //确认删除提示显示状态
            slider: false, //创建/编辑收货人地址滑出收起状态
            optionType:0,//0新建  1 修改（编辑）
            cachData: nodata,//缓存编辑数据
            index: null,
            id: null,
            btnType:0//编辑按钮是否可用状态
        };
    },
    componentDidMount: function() {
        this.fetchData();

    } ,
    io: function(param){
          return $.ajax({
              url: param.url,
              data: param.data || {},
              dataType: 'json'//'jsonp'
    });
    },
    fetchData: function() {
        var self = this;
       $.ajax({
            url:'getMyAddress.js',
           // data: { method: 'getMyAddress' },
            dataType: 'json',//'jsonp',
            success: function(data) {
                switch (data.status) {
                    case 0:
                        if (this.isMounted()) {
                            this.setState({
                                data: data.data,
                                loading: false
                            });
                            self.hideLoading();
                        }
                        $('.loading').remove();
                        break;
                    case -1:
                       // settings.onCustomError.call(this, data);
                        break;
                    case -2:
                        dialog({
                            text: data.msg
                        });
                        break;
                    case -3:
                      //  location.href = GY.host.mobile_main + '/login';
                        break;
                    case -4:
                      //  window.location.href = GY.host.mobile_main;
                        break;
                    default:
                        dialog({
                            text: '未知错误'
                        });
                };

            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
    },
    hideLoading: function() {
        this.setState({
            loading: false
        });
    },//修改input
    changeTodoState: function(value, vname) {
        var cachName = vname;
        var str = '{"'+vname+'":"'+value+'"}';
        //改变输入值的时候需要合并选择城市的数据
        let citys = $('#txt_area2').val();
        let codes = $('#txt_area2').attr('data-code');
        var getCodes = {
            'province':citys.split(' ')[0],
            'city': citys.split(' ')[1],
            'county': citys.split(' ')[2],
            'provinceCode': codes.split(',')[0],
            'cityCode': codes.split(',')[1],
            'countyCode': codes.split(',')[2]
        } 
         var codesdata = $.extend(true,this.state.cachData, getCodes);
         var dd = $.extend(true,codesdata, JSON.parse(str));
         if(isHigt() ===true){//可以高亮
            this.setState({
              cachData:dd,
              btnType:1
            });          
         }else{
           // 修改 
          this.setState({
              cachData:dd,
              btnType:0
          });           
         }

    },
    handleOpenSlide: function(state) {
        this.setState({
            [state.toString()]: true
        });
    }, //删除——询问是否确认删除
    onRemove: function(adress, index) {
        let id = adress.id;  
        this.setState({
            open: true,
            index: index,
            id: id
        });
    }, 
    getSelAddress : function(adress, index){
        var self = this;
        localStorage.setItem("addressId", adress.id);
        //window.location.href = GY.host.mobile_main + "/tradeConfirm";
    },
    //setDefault  主动去修改data 中 this.data.item 的 isDefault
    // 14.设置默认地址
    //请求：http://10.10.10.191/CmowFrontUserAddressAction.do?method=setDefaultAddress
    setDefault: function(adress, index) {
        var self = this;
        $.ajax({
            url: 'setDefaultAddress.js',//this.props.source,
            data: {
                method: 'setDefaultAddress',
                id: adress.id
            },
            dataType: 'json',//'jsonp',
            success: function(data) {
                if (this.isMounted()) {
                    //清除全部选中 
                    this.setState({
                        data: this.state.data.map((d) => {
                            d.isDefault = 1;
                            return d;
                        })
                    });
                    //判断是否已经设置
                    if (this.state.data[index].isDefault == 1) {
                        this.state.data[index].isDefault = 0;
                    } else {
                        this.state.data[index].isDefault = 1;
                    }
                    //self.hideLoading();
                    this.setState({
                        data: this.state.data
                    });
                }
                localStorage.setItem("addressId", adress.id);

            }.bind(this),
            error: function(xhr, status, err) {}.bind(this)
        });
    },
    onEdit: function(adress, index) {
        //var editData = this.state.data.data[index];
        //复制出新的数据        
        var cachData = $.extend(true,cachData, this.state.data[index]);
       //if (this.isMounted()){
         this.setState({
            cachData: cachData,
            index: index,
            slider:1,
            optionType:1, //设置为编辑状态
            btnType:1
        });            
        //}
    },//新建地址
    onCreat: function() {
        //var editData = this.state.data.data[index];
        //复制出新的数据
        //

        if (this.isMounted()){
            let nodata = {
                id: '',
                receive: '',
                receiveTel: '',
                receivePhone: '',
                receiveEmail: '',
                province: '',
                city: '',
                county: '',
                detailAddress: '',
                provinceCode: '',
                cityCode: '',
                countyCode: '',
                isDefault: '1',
                btnType:0
            }           
            this.setState({
                cachData: nodata,
                slider:1,
                optionType:0, //设置为新建状态
                btnType:0
            });         
        }
    },
    //确认删除
    //17.删除收货地址
    deleteAdrItem: function() {
        this.closeConfirm();
        var self = this;
        $.ajax({
            url: 'deleteAddress.js',//GY.host.mobile_main+'/CmowFrontUserAddressAction.do',
            data: {
                method: 'deleteAddress',
                id: this.state.id
            },
            dataType: 'json',//'jsonp',
            success: function(data) {

                if (this.isMounted()) {

                    this.state.data.splice(this.state.index, 1);
                    //this.closeConfirm();
                }
            }.bind(this),
            error: function(xhr, status, err) {}.bind(this)
        });
    }, //保存地址
    saveAdress: function(adress, index) {
        this.updataAdress();
    }, //更新修改
    updataAdress: function() {
         if($('[save-btn]').hasClass('btn-disabled')){
            return;
        }
                if (this.isMounted()){
                
                let citys = $('#txt_area2').val();
                let codes = $('#txt_area2').attr('data-code');
                var regPhone = /^(13[0-9]|15[012356789]|18[0123456789]|147|145|17[0-9])\d{8}$/;
                      var getCodes = {
                        'province':citys.split(' ')[0],
                        'city': citys.split(' ')[1],
                        'county': citys.split(' ')[2],
                        'provinceCode': codes.split(',')[0],
                        'cityCode': codes.split(',')[1],
                        'countyCode': codes.split(',')[2]
                      }                
                  let optionState = this.state.optionType;
                  let self = this;
                  let newData;
                        //校验字段                       
                        if($.trim(self.state.cachData.receive) == ""){
                          self.dailog('收货人姓名不能为空');
                          return;
                        }
                        if($.trim(self.state.cachData.receiveTel) == ""){
                          self.dailog('手机号码不能为空');
                          return;
                        }else if(!regPhone.test($.trim(self.state.cachData.receiveTel))){
                          self.dailog('请输入正确手机号码');
                          return;  
                        }
                        if($.trim(self.state.cachData.detailAddress) == ""){
                          self.dailog('详细地址不能为空');
                          return;
                        }
                         if($.trim(codes.split(',')[0]) == ""){
                          self.dailog('省不能为空');
                          return;
                        }
                         if($.trim(codes.split(',')[1]) == ""){
                          self.dailog('城市不能为空');
                          return;
                        }
                         if($.trim(codes.split(',')[2]) == ""){
                          self.dailog('区域不能为空');
                          return;
                        }
                      newData = $.extend(true, self.state.cachData,getCodes);
                      
                      var  datas =  self.state.data.concat(newData);

                    if(optionState == 0){
                      //let citycode = data.provinceCode+","+data.cityCode+","+data.countyCode;
                      self.io({
                          url: 'saveAddress.js',//GY.host.mobile_main+'/CmowFrontUserAddressAction.do',
                          data: {
                            method: 'saveAddress',
                            address: encodeURIComponent(JSON.stringify(newData)).replace(/'/g, "%27")
                          }
                      }).done(function(){ 
                        self.fetchData();                         
                      });                      

                       // alert('创建成功！');
                    }else if(optionState== 1){

                      self.io({
                          url: 'updateAddress.js',//GY.host.mobile_main+'/CmowFrontUserAddressAction.do',
                          data: {
                            method: 'updateAddress',
                            address: encodeURIComponent(JSON.stringify(self.state.cachData)).replace(/'/g, "%27")
                          }
                      }).done(function(){
                        //直接刷新整个list
                         self.fetchData();

                         //修改index数据（问题：第一条数据修改无效 state未发生变化）

                      });   
                    } 

                    this.setState({
                        slider:false
                    });

                    function out(){

                        let targetPanel = $('#selectorPanel');
                            if (targetPanel === null) {
                                return;
                            };                            
                            requestAnimationFrame(function() {
                                $("#view").removeClass('panel-open');
                            });
                            setTimeout(function() {
                                targetPanel.addClass('hide');
                                $('[data-mask]').detach();
                                
                                targetPanel = null;
                            }, 201);
                    }
                    out();
                  }
        
    },  
    dailog: function(msgText){
        var tpl =[];
        tpl.push('<div class="dialog">');
        tpl.push('<div class="dialog-body">');
        tpl.push('<p class="gray">'+msgText+'</p>');
        tpl.push('<p class="btn-area">');
        tpl.push(' <span class="btn btn-primary close_btn">关闭</span>');
        tpl.push('</p>');
        tpl.push('</div>');
        tpl.push('</div>');
        $('body').append(tpl.join(''));
        $('.close_btn').click(function(){
            $('.dialog').remove();
        });
    },  
    closeDailog: function(){

    }, 
    closeConfirm: function() {
        this.setState({
            open: false
        });
    },//关闭面板
    closePanel: function(){
        this.setState({
            open:false,
            slider:false
        });
    },
    render: function() {
        var self = this;
        if (this.state.loading) {
            return (
                <div className="loading play hide"><span></span>加载中</div>                
            );
        } else {

            let adrs = self.state.data;
            let slider = this.state.slider;
            let open = this.state.open;
            let className;
            let classMask;
            let classView;

            className = 'panel panel-selector  adr_edit hide'; 
            classView = 'view'; 
            classMask = 'mask hide';  

           if(adrs== "nodata" || adrs.length == 0){

            var addressList ='暂无地址请新建地址';
            var addrClass ='noadr';
           }else{
            var addressList = adrs.map(function(repo, index) {
                let isDefaultText =  repo.isDefault ? '设为默认' : '默认地址' ;

                return ( < li key = { index } className = { repo.isDefault ? '' : 'default' } >
                    < div countycode = "110101001"  citycode = "110101000"
                    provincecode = "110000000"  isdefault = "0"
                    className = "hd" onClick = { self.getSelAddress.bind(null, repo, index) }> < span receive = ""
                    className = "name" > { repo.receive } < /span><span className="phone" receivetel="">{repo.receiveTel}</span >
                    < /div> < p className="addressItem" onClick = { self.getSelAddress.bind(null, repo, index) } > < span province = "" > {repo.province} < /span> <span city="">{repo.city}</span > < span county = "" > { repo.county } < /span> <span detailaddress="">{repo.detailAddress}</span >
                    < /p> 
                    <div className = "action" >

                    <span aid = { repo.id } data-default-btn = "" onClick = { self.setDefault.bind(null, repo, index) }
                    className = "select fl" >{isDefaultText}</span> 
                    < span aid = "" className = "del fr" onClick = { self.onRemove.bind(null, repo, index) 
                    }  data-del-btn = "" data-confim=""> 删除 < /span> 
                    < span  aid = "" ref="giraffe" data-edit-btn = ""
                    onClick = { self.onEdit.bind(null, repo, index) }
                    className = "edit fr" > 编辑 < /span> 

                    < /div> 

                    < /li>
                );
            }); 
            var addrClass =' ';           
           }

            return ( < main >
                <div id=""  ref="giraffe">
                < div className = "page hasfootbar" >

                < div className = "address-list"
                id = "addressList" >

                < ul className={addrClass} > { addressList } < /ul> < /div>


                < /div> < div className = "footbar footbar-default" >
                < div className = "action" >

                <CreateBox callbackCreate={this.onCreat}/>

                < /div> 
                < /div> 

                < div className = {className}  id = "selectorPanel" ref="giraffe" >
                    < ReceiveEditBox slider = { this.state.slider } optionType = {this.state.optionType} btnType ={this.state.btnType}
                              editData = { this.state.editData }
                              cachData = { this.state.cachData }
                              changeTodoState = { this.changeTodoState }
                              callbackSave = { this.saveAdress }
                              index = { this.state.index }
                              closePanel ={this.closePanel}
                              /> 
                </div>
                < ConfirmBox open = { this.state.open }
                 callbackParent = { this.closeConfirm }
                 deleteAdrItem = { this.deleteAdrItem } /> 

                <div refs="giraffe" className= {classMask} onClick ={this.closePanel}></div> 

                </div>
                </main>
            );
        }
    }
});
//渲染插入组件http://localhost:3000/js/json.js
ReactDOM.render( < AddressList source = ""
    name = 'Nicole Wang' / > ,
    document.getElementById('box')
);


