sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Icon"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,Icon) {
        "use strict";

        return Controller.extend("ux400solving.controller.Main", {
            formatter: {
                transformDiscontinued: function(ofmyn){
                    let oFormatyesno;
                    if (ofmyn === true ){
                        oFormatyesno = 'yes';
                    } else {
                        oFormatyesno = 'no';
                    }
                    console.log(ofmyn);
                    return oFormatyesno;
                }   
            },
            onInit: function () {
                var datas = {
                    list : [
                    //    { ListValue : }
                    ],

                }
                this.getView().setModel(new JSONModel(datas),"RandModel");
            },
            onRandomPress: function(){
                /* 랜덤 함수 */
                var oModel = this.getView().getModel("RandModel"),
                    aList = oModel.getData().list;
                var ranNum = Math.floor(Math.random()*100)+1;
                
                this.byId("randInput").setValue(ranNum);
                /* 테이블에 데이터를 push 하는 로직 */
                aList.push({
                    ListValue : ranNum // 이부분 !! ListValue를 바로 키값으로 설정해두면 자동으로 들어가지더라~~
                });
                oModel.setProperty("/list", aList);
            },
            openDialog: function(){
                /* Dialog 호출 */
                var oDialog = this.byId("addDialog");

                if(oDialog) {
                    oDialog.open();
                    return;
                }

                this.loadFragment({
                    name: "ux400solving.view.fragment.Products",
                }).then(function(oDialog){
                    oDialog.open();
                }, this);
            },
            onClose: function(oEvent){
                var oDialog = oEvent.getSource().getParent(); //Dialog의 버튼 객체 가져옴
                oDialog.close();
            },
            onValueChange: function(ranNum, ovData){

                /* 사용자 입력 값 1~100 Validation  */
                // let oControl = this.byId("idInput");
                // let iNum = Number(oControl.getValue());
                // let isOk = iNum >= 1 && iNum <= 100;

                // oControl.setValueState(isOk ? 'None':'Error');
                // oControl.setValueStateText(isOk ? '': '1~100 사이의 숫자를 입력하세요');
                // this.byId("idButton").setEnabled(isOk ? true:false); // (프로퍼티) setEnabled : 버튼 활성화 / 비활성화

                /* 내 코드 */
                var oModel = this.getView().getModel("RandModel"),
                    aList = oModel.getData().list;
                let oControl = this.byId("randInput");
                let iNum = Number(oControl.getValue());
                let isOk = iNum >= 1 && iNum <= 100;

                var userInputval = Number(this.byId("randInput").getValue());
                
                (1 <= userInputval && userInputval <= 100) ? aList.push({
                    ListValue : userInputval 
                }) : oControl.setValueState(isOk ? 'None':'Error') &&
                     oControl.setValueStateText(isOk ? '':'1~100 사이의 숫자를 입력하세요.'); // false일때 콘솔 로그했는데 setEnabled(사용해도 됨)

                oModel.setProperty("/list", aList);
                console.log(avalnum);
            }   
        });
    });
