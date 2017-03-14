angular.module("mainapp",[])
    .controller("mainsignupcontroller",function($scope){
        $scope.inputAccount = "";
        $scope.inputUsername = "";
        $scope.inputPassword = "";
        $scope.inputEmail = "";
        $scope.inputTel = "";
        $scope.roleidTemp = "";
        $scope.roleChooseTemp = [
            {"name":"学生","id":1,"string":"student"},
            {"name":"教师","id":2,"string":"teacher"},
            {"name":"领导","id":3,"string":"leader"}];
        function checkFirst(){
            if($scope.inputUsername!=null && $scope.inputUsername!=""
                && $scope.inputPassword!=null && $scope.inputPassword!=""
                && $scope.inputEmail!=null && $scope.inputEmail!=""
                && $scope.inputTel!=null && $scope.inputTel!=""
                && $scope.roleidTemp!=null && $scope.roleidTemp!=""){
                return true;
            }else{
                return false;
            }
        };
        //注册
        $scope.register = function(){
            if(checkFirst() != false){
                $scope.inputPassword = hex_md5($scope.inputPassword);
                $.ajax({
                    type:"POST",
                    url:"/login/register",
                    data:{
                        "account":$scope.inputAccount,
                        "username":$scope.inputUsername,
                        "password":$scope.inputPassword,
                        "tel":$scope.inputTel,
                        "email":$scope.inputEmail,
                        "role":$scope.roleidTemp.string
                    },
                    contentType:"application/x-www-form-urlencoded",
                    dataType:"json",
                    success:function(data){
                        console.log(data);
                        $scope.$apply(function(){
                            if(data.success == true && data.message == "注册成功"){
                                $scope.inputUsername = "";$scope.inputPassword = "";
                                $scope.inputEmail = "";$scope.inputTel = "";
                                alert("注册成功!");
                                window.location.href = "login.html";
                            }else if(data.success == false && data.message == "该账号已存在..."){
                                $scope.inputUsername = "";$scope.inputPassword = "";
                                $scope.inputEmail = "";$scope.inputTel = "";
                                alert("该账号已被注册...");
                            }
                        });
                    }
                });
            }else{
                alert("请将信息填写完整...");
            };
        };
        $scope.roleSelect = function (item) {
            $scope.roleidTemp = item;
        };
    })


