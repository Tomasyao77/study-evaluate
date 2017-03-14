angular.module("mainapp",[])
    .controller("maincontroller",function($scope){
        $scope.inputUsername = "";
        $scope.inputPassword = "";
        $scope.roleidTemp = "";
        $scope.roleChooseTemp = [
            {"name":"学生","id":1,"string":"student"},
            {"name":"教师","id":2,"string":"teacher"},
            {"name":"领导","id":3,"string":"leader"}];
        //登录
        $scope.login = function(){
            if(checkFirst() != false){
                login_ajax($scope.inputUsername,$scope.inputPassword);
            }else{
                alert("请将信息填写完整...");
            };
        };
        function checkFirst(){
            if($scope.inputUsername!=null && $scope.inputUsername!=""
                && $scope.inputPassword!=null && $scope.inputPassword!=""
                && $scope.roleidTemp!=null && $scope.roleidTemp!=""){
                return true;
            }else{
                return false;
            }
        };
        function login_ajax(username,password){
            this.username = username;
            this.password = hex_md5(password);
            $.ajax({
                type:"POST",
                url:"/login/login",
                data:{"username":this.username,"password":this.password,"role":$scope.roleidTemp.string},
                contentType:"application/x-www-form-urlencoded",
                dataType:"json",
                success:function(data){
                    console.log(data);
                    $scope.$apply(function(){
                        if(data.success == true && data.message == "登录成功"){
                            $scope.inputUsername = "";$scope.inputPassword = "";
                            window.location.href = "../jsp/gym/index.jsp?userName="+data.value.username+
                                "&userId="+data.value.id+"&role="+data.value.role;
                        }else if(data.success == false && data.message == "密码错误"){
                            $scope.inputUsername = "";$scope.inputPassword = "";
                            alert("密码错误!");
                        }else if(data.success == false && data.message == "该用户已被封号"){
                            $scope.inputUsername = "";$scope.inputPassword = "";
                            alert("该用户已被封号,请联系管理员!");
                        }else if(data.success == false && data.message == "该用户不存在"){
                            $scope.inputUsername = "";$scope.inputPassword = "";
                            alert("该用户不存在！");
                        }
                    });
                }
            });
        };
        $scope.roleSelect = function (item) {
            $scope.roleidTemp = item;
        };
    })

