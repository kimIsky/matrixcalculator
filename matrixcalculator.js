// 행렬 객체의 시작
class xy_cal{
    constructor( x_num, y_num ){
        this.x_num = x_num;
        this.y_num = y_num;
        this.val_num = [];
        this.print_a = "";
        this.id_m = "";
        this.cal_num = "";
    }
    //OUTPUT버튼 클릭 시 그려지는 메소드
    zero_array(id_name){
        let i = 0;
        while( i < this.x_num ){
            this.val_num.push([]);            
            let j = 0;
            while( j < this.y_num ){
                this.val_num[i][j] = 0;
                j++;
            }
            i++;
        }
        i = 0;
        while( i < this.x_num ){
            let j = 0;
            while( j < this.y_num ){
                this.print_a += '<input id="'+id_name+i+"_"+j+'"class="min_box" type="number" value="'+this.val_num[i][j]+'">';
                j++;                
            }
            i++;
        }
        return this.print_a;
    }
    //RANDOM버튼 클릭 시 그려지는 메소드    
    random_array(id_name){
        let i = 0;
        while( i < this.x_num ){
            this.val_num.push([]);            
            let j = 0;
            while( j < this.y_num ){
                this.val_num[i][j] = Math.floor(Math.random()*100);
                j++;
            }
            i++;
        }
        i = 0;
        while( i < this.x_num ){
            let j = 0;
            while( j < this.y_num ){
                this.print_a += '<input id="'+id_name+i+"_"+j+'"class="min_box" type="number" value="'+this.val_num[i][j]+'">';
                j++;                
            }
            i++;
        }
        return this.print_a;
    }
    //행렬을 그릴 때 영역을 구분        
    print_array(pt_id){
        $("#"+pt_id).css("width", (49*this.y_num)+"px");
    }
    //MINUS 연산
    minus_array(){
        let i = 0;
        while( i < this.x_num ){
            let j = 0;
            while( j < this.y_num ){
                this.cal_num += '<div class="min_box">'+(parseInt($("#in_a"+i+"_"+j).val())-parseInt($("#in_b"+i+"_"+j).val()))+'</div>';
                j++;
            }
            i++;
        }
    }
    //PLUS 연산
    plus_array(){
        let i = 0;
        while( i < this.x_num ){
            let j = 0;
            while( j < this.y_num ){
                this.cal_num += '<div class="min_box">'+(parseInt($("#in_a"+i+"_"+j).val())+parseInt($("#in_b"+i+"_"+j).val()))+'</div>';
                j++;
            }
            i++;
        }
    }    
}

//전체 팝업 실행 함수
pop_event=( id, body )=>{
    $(".pop_up, .x_box").css("display", "block");
    $(".pop_up").html(body);
    $("#"+id).val("");
    $(".pop_up, .x_box").click(function(){
        $(".pop_up, .x_box").css("display", "none");        
    });
}
// 그리려는 행렬 값을 입력 시 검사 진행하여 팝업 노출
$("input").on("keyup", function(){
    const check_in = /^[-0]|[\.]/g;
    if(check_in.test($("#x1_num").val())){
        pop_event("x1_num", "숫자 1부터~12까지 입력해 주세요.");
        $("#print_a, #print_b, #print_o").empty();
    }
    if(check_in.test($("#x2_num").val())){
        pop_event("x2_num", "숫자 1부터~12까지 입력해 주세요..");
        $("#print_a, #print_b, #print_o").empty();        
    }
    if(check_in.test($("#y1_num").val())){
        pop_event("y1_num", "숫자 1부터~12까지 입력해 주세요.");
        $("#print_a, #print_b, #print_o").empty();        
    }
    if(check_in.test($("#y2_num").val())){
        pop_event("y2_num", "숫자 1부터~12까지 입력해 주세요.");
        $("#print_a, #print_b, #print_o").empty();        
    }            
});

//이벤트 영역
$(document).on("click", function(e){
    //A와 B의 입력 값
    var xa_v = Number($("#x1_num").val());
    var ya_v = Number($("#y1_num").val());
    var xb_v = Number($("#x2_num").val());
    var yb_v = Number($("#y2_num").val());
    //영역별 객체 복제            
    var a_val = new xy_cal(xa_v, ya_v);
    var b_val = new xy_cal(xb_v, yb_v);
    //곱하기 함수    
    multi_array =()=> {
        let m_st = "";
        let new_array = "";
        let total_num = 0;            
        for( let i = 0; i < a_val.x_num ; i++ ){
            m_st = [];
            for( let j = 0; j < b_val.y_num; j++ ){
                for( let k = 0; k < a_val.y_num; k++ ){
                    total_num += parseInt($('#in_a'+i+"_"+k).val())*parseInt($('#in_b'+k+"_"+j).val());
                }
                m_st += '<div class="min_box">'+total_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</div>';
                total_num = 0;
            }
            new_array += m_st;
        }
        return new_array;
    }
    //행렬이 그려진 후 값이 변경되었을 경우 클릭 이벤트 발생 시 검사 요소
    const check_in = /^[-0]|[\.]/g;
    const html_testa = $("#print_a").html();
    const html_testb = $("#print_b").html();
    // 각 버튼별 검사 후 이벤트    
    switch(e.target.id){
        case 'print_bt' :
            if( check_in.test(xa_v) || check_in.test(xb_v) || check_in.test(ya_v) || check_in.test(yb_v) || xa_v > 12 || xb_v > 12 || ya_v > 12 || yb_v > 12 ){
                pop_event("x1_num, #x2_num, #y1_num, #y2_num ", "숫자 1부터~12까지 입력해 주세요.");
                $("#print_a, #print_b, #print_o").empty(); 
            } else {                
            a_val.zero_array("in_a");
            a_val.print_array("print_a");
            $("#print_a").html(a_val.print_a);
            b_val.zero_array("in_b");
            b_val.print_array("print_b");
            $("#print_b").html(b_val.print_a);
            }            
            break;
        case 'random_bt' :
            if( check_in.test(xa_v) || check_in.test(xb_v) || check_in.test(ya_v) || check_in.test(yb_v) || xa_v > 12 || xb_v > 12 || ya_v > 12 || yb_v > 12 ){
                pop_event("x1_num, #x2_num, #y1_num, #y2_num ", "숫자 1부터~12까지 입력해 주세요.");
                $("#print_a, #print_b, #print_o").empty(); 
            } else {            
            a_val.random_array("in_a");
            a_val.print_array("print_a");
            $("#print_a").html(a_val.print_a);
            b_val.random_array("in_b");
            b_val.print_array("print_b");
            $("#print_b").html(b_val.print_a);
            }            
            break;
        case 'reset_bt' :
            $("#print_a, #print_b, #print_o").empty();
            $("#x1_num, #x2_num, #y1_num, #y2_num").val("");           
            break;
        case 'plus_bt' :
            if( html_testa == "" && html_testb == ""){ 
                pop_event("plus_bt", "OUTPUT을 먼저 눌러주세요.");
            } else if( xa_v == xb_v && ya_v == yb_v ){
                a_val.plus_array();
                a_val.print_array("print_o");
                $("#print_o").html(a_val.cal_num);
            } else {
                pop_event("plus_bt", "A와 B의 행열이 같아야 합니다.");
                $("#print_a, #print_b, #print_o").empty();
            } 
            break;
        case 'minus_bt' :
            if( html_testa == "" && html_testb == ""){ 
                pop_event("minus_bt", "OUTPUT을 먼저 눌러주세요.");
            } else if( xa_v == xb_v && ya_v == yb_v ){
                b_val.minus_array("-");
                b_val.print_array("print_o");
                $("#print_o").html(b_val.cal_num);
            } else {
                pop_event("minus_bt", "A와 B의 행열이 같아야 합니다.");
                $("#print_a, #print_b, #print_o").empty();                
            }
            break;
        case 'multi_bt' :
            if( html_testa == "" && html_testb == ""){ 
                pop_event("multi_bt", "OUTPUT을 먼저 눌러주세요.");
            } else if( xb_v == ya_v ){
            b_val.print_array("print_o");            
            $("#print_o").html(multi_array());
            } else {
                pop_event("multi_bt", "A열과 B행이 같아야 합니다.");
                $("#print_a, #print_b, #print_o").empty();                
            }
            
    } 
});