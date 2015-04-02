<?
include_once("../_config/pref.php");
include_once("../_class/dbs.php");
include_once("../_class/file.php");
include_once("../_lib/function.php");
include_once("array.php");

$_news_cat = array (
	1 => NEWS_CAT_1,
	3 => NEWS_CAT_3,
	4 => NEWS_CAT_4,
	5 => NEWS_CAT_5
);

$_news_real_cat = array(
    0 => 1,
    1 => 3,
    2 => 5,
);

$db = & new dbSimple(DB_HOST, DB_LOGIN, DB_PASS, DB_NAME);
$user_file = & new file_public(0, FILE_SAVE_PATH, FILE_URL);
switch($a)
{
	/*case "get_news_list":
		$qty = $db->select_cel("SELECT count(*)
		FROM snews_list AS s 
		INNER JOIN snews_list_lang AS sl ON (s.REC_ID = sl.REC_ID AND sl.LANG =?s) 
		WHERE s.ST = 1 AND s.CONFERENCE = 0", $_GET["lang"]);
		
		$result = $db->select("SELECT s.REC_ID, sl.TITLE
		FROM snews_list AS s 
		INNER JOIN snews_list_lang AS sl ON (s.REC_ID = sl.REC_ID AND sl.LANG =?s) 
		WHERE s.ST = 1 AND s.CONFERENCE = 0
		ORDER BY s.DZ DESC LIMIT ?i, ?i", $_GET["lang"], $_GET["page"], $_GET["limit"]);
		if(mysql_num_rows($result)>0)
		{
			$data = array();
			while($row = mysql_fetch_assoc($result))
			{
				$data[$row["REC_ID"]] = $row;
			}
			echo json_encode(array("list"=> $data, "qty"=> $qty));
		}
		else
		{
			echo json_encode(array());
		}
	break;*/
	
	case "get_news_list":
		$result = $db->select("SELECT s.REC_ID, sl.TITLE
		FROM snews_list AS s 
		INNER JOIN snews_list_lang AS sl ON (s.REC_ID = sl.REC_ID AND sl.LANG =?s) 
		WHERE s.ST = 1 AND s.CONFERENCE = 0 AND CAT = ?i
		ORDER BY s.DZ DESC LIMIT ?i, ?i", $_GET["lang"], $_GET["cat"], $_GET["page"], $_GET["limit"]);
		if(mysql_num_rows($result)>0)
		{
			$qty = mysql_num_rows($result);
			$data = array();
			while($row = mysql_fetch_assoc($result))
			{
				$data[$row["REC_ID"]] = $row;
			}
			echo json_encode(array("list" => $data , "qty" => $qty));
		}
		else
		{
			echo json_encode(array());
		}
	break;
	
	case "get_news_cnt":
		$result = $db->select("SELECT s.DZ, s.FILE1, sl.*
		FROM snews_list AS s
		INNER JOIN snews_list_lang AS sl ON (s.REC_ID = sl.REC_ID AND sl.LANG = ?s)
		WHERE s.ST = 1 AND s.CONFERENCE = 0 AND s.REC_ID = ?i", $_GET["lang"], $_GET["id"]);
		if(mysql_num_rows($result) > 0)
		{
			$data = array();
			while($row = mysql_fetch_assoc($result))
			{
				if(strlen($row["FILE1"])<10)
				{
					$row["FILE1"]="/_images/emgoldex/snews/".$row["FILE1"];
				}
				else
				{
					$row["FILE1"] = $user_file->get_url($row["FILE1"], 1);
				}
				$row["TOPIK"] = trim(preg_replace('/\s\s+/', ' ', $row["TOPIK"]));
				$row["TOPIK"] = strip_tags($row["TOPIK"]);
				$row["TOPIK"] = htmlspecialchars_decode($row["TOPIK"]);
				$row["TOPIK"] = str_replace("&nbsp;", '', $row["TOPIK"]);
				$data = $row;
			}
			// echo json_encode($row);
			echo json_encode($data);
		}
		else
		{
			echo json_encode(array());
		}
	break;
	
	case "get_last_news":
		$result = $db->select("SELECT s.REC_ID, s.DZ, s.FILE1, sl.TITLE, sl.TOPIK
		FROM snews_list AS s 
		INNER JOIN snews_list_lang AS sl ON (s.REC_ID = sl.REC_ID AND sl.LANG =?s) 
		WHERE s.ST = 1 AND s.CONFERENCE = 0 AND s.CAT = ?i
		ORDER BY s.DZ DESC LIMIT ?i", $_GET["lang"], $_GET["cat"], $_GET["limit"]);
		if(mysql_num_rows($result)>0)
		{
			$qty = mysql_num_rows($result);
			$data = array();
			$ids = array();
			while($row = mysql_fetch_assoc($result))
			{
				$ids[] = $row["REC_ID"];
				if(strlen($row["FILE1"])<10)
				{
					$row["FILE1"]="/_images/emgoldex/snews/".$row["FILE1"];
				}
				else
				{
					$row["FILE1"] = $user_file->get_url($row["FILE1"], 1);
				}
				$row["TOPIK"] = strip_tags($row["TOPIK"]);
				$row["TOPIK"] = htmlspecialchars_decode($row["TOPIK"]);
				$row["TOPIK"] = str_replace("&nbsp;", '', $row["TOPIK"]);
				$strlen = 255; 
				if(mb_strlen($row["TOPIK"], "UTF-8") > 255)
				{
					$row["TOPIK"] = mb_substr($row["TOPIK"], 0, $strlen, "UTF-8")."...";
				}
				$row["DZ"] = date("d.m.Y", strtotime($row["DZ"]));
				$data[$row["REC_ID"]] = $row;
			}
			echo json_encode(array("data" => $data, "sort" => $ids));
		}
		else
		{
			echo json_encode(array());
		}
	break;

	case "get_more_news":
		$result = $db->select("SELECT s.REC_ID, s.DZ, s.FILE1, sl.TITLE, sl.TOPIK
		FROM snews_list AS s 
		INNER JOIN snews_list_lang AS sl ON (s.REC_ID = sl.REC_ID AND sl.LANG =?s) 
		WHERE s.ST = 1 AND s.CONFERENCE = 0 AND s.CAT = ?i
		ORDER BY s.DZ DESC LIMIT ?i, ?i", $_GET["lang"], $_GET["cat"], $_GET["page"], $_GET["limit"]);
		if(mysql_num_rows($result)>0)
		{
			$def = "http://emex4.shedevre.com/_images/emgoldex/snews/057.jpg";
			$qty = mysql_num_rows($result);
			$data = array();
			$ids = array();
			while($row = mysql_fetch_assoc($result))
			{
				$ids[] = $row["REC_ID"];
				if(strlen($row["FILE1"])<10)
				{
					$row["FILE1"] = "http://emex4.shedevre.com/_images/emgoldex/snews/".$row["FILE1"];
				}
				else
				{
					$row["FILE1"] = $user_file->get_url($row["FILE1"], 1);
				}
				
				$row["TOPIK"] = strip_tags($row["TOPIK"]);
				$row["TOPIK"] = htmlspecialchars_decode($row["TOPIK"]);
				$row["TOPIK"] = str_replace("&nbsp;", '', $row["TOPIK"]);
				$strlen = 255; 
				if(mb_strlen($row["TOPIK"], "UTF-8") > 255)
				{
					$row["TOPIK"] = mb_substr($row["TOPIK"], 0, $strlen, "UTF-8")."...";
				}
				$row["DZ"] = date("d.m.Y", strtotime($row["DZ"]));
				$data[$row["REC_ID"]] = $row;
			}
			echo json_encode(array("data" => $data, "sort" => $ids));
		}
		else
		{
			echo json_encode(array());
		}
	break;
	
	case "check_user_login":
		if(!isset($_GET["login"]) || !isset($_GET["password"]))
		{
			echo 0;
			break;
		}

		$login = $_GET["login"];
		$pass = $_GET["password"];
		$result = $db->select_row("select login.*, base.* from tbl_user_login as login, tbl_user_base as base where login.LOGIN = ?s and login.UID = base.UID AND base.ACTIV = 1", $login);

		if($result)
		{
			foreach( array( "PASS", "OLDPASS" ) as $value )
			{
				if( $result[ $value ] == "" ) continue;

				$hash_type = substr( $result[ $value ], 0, 3 );

				switch( substr( $result[ $value ], 0, 3 ) )
				{
					case "sha":
						$pass = sha1($pass);
					break;
					case "md5":
						$pass = md5($pass);
					break;
				}

				if( $pass == substr( $result[ $value ], 4 ) )
				{
					echo $result["UID"];
				}
			}
		}
		else
		{
			echo 0;
		}
	break;
	
	case "get_user_info":
		if(!isset($_GET["uid"]))
		{
			break;
		}
		$row = $db->select_row("
			SELECT n.NAME, n.SNAME, i.NICK, i.AVATARA, i.SEX, i.DRZ, a.STRANA, a.GOROD, a.RAJON, a.PINDEX, a.ADRES, p.INFO as PHONE, e.INFO as EMAIL, s.INFO as SKYPE, l.LOGIN, n.UID
			FROM tbl_user_name AS n
			LEFT JOIN tbl_user_info as i ON (n.UID = i.UID)
			LEFT JOIN tbl_user_adres as a ON (n.UID = a.UID)
			LEFT JOIN tbl_user_contact as p ON (n.UID = p.UID AND p.TIP = 1)
			LEFT JOIN tbl_user_contact as e ON (n.UID = e.UID AND e.TIP = 0)
			LEFT JOIN tbl_user_contact as s ON (n.UID = s.UID AND s.TIP = 3)
			LEFT JOIN tbl_user_login as l ON (n.UID = l.UID)
			WHERE n.UID = ?i", $_GET["uid"]);
		if($row)
		{
			include_once('../system/i18n/array.php');
			$row["AVATARA"] = $user_file->get_url($row["AVATARA"], 1);
			echo json_encode($row);
		}
		else
		{
			echo json_encode(array());
		}
	break;
	
	case "update_profile":
		if($_POST["form"] == "") break;
		switch($_POST["form"])
		{
			case "personal":
				$db->query("UPDATE tbl_user_name SET NAME = ?s, SNAME = ?s WHERE UID = ?i", $_POST["NAME"], $_POST["SNAME"], $_POST["UID"]);
				$db->query("UPDATE tbl_user_info SET DRZ = ?s, SEX = ?s WHERE UID = ?i", $_POST["DRZ"], $_POST["SEX"], $_POST["UID"]);
			break;
			
			case "contact":
				$db->query("UPDATE tbl_user_adres SET STRANA = ?s, GOROD = ?s, RAJON = ?s, PINDEX = ?s, ADRES = ?s WHERE UID = ?i", $_POST["STRANA"], $_POST["GOROD"], $_POST["RAJON"], $_POST["PINDEX"], $_POST["ADRES"], $_POST["UID"]);
				$db->query("UPDATE tbl_user_contact SET INFO = ?s WHERE UID = ?i AND TIP = 1", $_POST["PHONE"], $_POST["UID"]);
				$db->query("UPDATE tbl_user_contact SET INFO = ?s WHERE UID = ?i AND TIP = 3", $_POST["SKYPE"], $_POST["UID"]);
				/*$check = $db->select_cel("SELECT CID FROM tbl_user_contact WHERE UID = ?i AND TIP = 0 AND INFO = ?s", $_POST["UID"], $_POST["EMAIL"]);
				if($check)
				{
					$db->query("UPDATE tbl_user_contact SET INFO = ?s AND OK = 0 WHERE UID = ?i AND TIP = 0", $_POST["EMAIL"], $_POST["UID"]);
					
				}*/
			break;
			
			case "user":
				$db->query("UPDATE tbl_user_info SET NICK = ?s WHERE UID = ?i", $_POST["NICK"], $_POST["UID"]);
			break;
		}
	break;
}
exit;
?>