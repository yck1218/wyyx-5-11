

jQuery.fn.extend({
    check:function($subCheck,$unCHK){
                let s =this;

            //  点击全选框 
        this.click(function(){

            $subCheck.prop("checked",this.checked);
        });
        // 点击 子复选框 
        $subCheck.click(function(){

                Result();
        });
        // 反选按钮
        $unCHK && $unCHK.click(function(){
            $subCheck.each(function(){
                this.checked = !this.checked;
            })

                    Result();
        });
        function Result(){
            let res =true;   // 假设全部都选中了 为true  
            $subCheck.each(function(){
            if(this.checked !=true){
                res=false;
                this.checked=false;
            }
            });
           s.prop("checked",res);
        }
    }
})
