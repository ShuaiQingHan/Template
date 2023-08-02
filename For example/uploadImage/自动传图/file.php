<?php
if($_POST){
	if(!file_exists("1.txt")){
		$res = file_put_contents("1.txt", $_POST['username']);
		if($res){
			$data['status'] = 1;
		    $data['info'] = "数据储存成功";
		}else{
			$data['status'] = 3;
		    $data['info'] = "数据储存失败";
		}
	}else{
		$data['status'] = 2;
		$data['info'] = "数据已经储存";
	}
}
//判断是否有文件上传；
//print_r($_FILES);die;
$filename = $_FILES['img']['tmp_name'];
if(is_uploaded_file($filename)){
	//储存文件
	if(!file_exists("upload")){
		mkdir("upload");
	}
	$res = move_uploaded_file($filename, "upload/".$_FILES['img']['name']);
	if($res){
		$result['status'] = 4;
		$result['info'] = '文件储存成功';
	}else{
		$result['status'] = 5;
		$result['info'] = '文件储存失败';
	}
	
}
 $arr["data_info"] = $data;
 $arr['file_info'] = $result;
 echo json_encode($arr);







?>