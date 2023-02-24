<?php
/**
 *
 * @package indrukwekkend-vacatures
 * 
 * Acceptatieomgeving Connexys API
 *  Vacature feed
 *  Public key: CXS-B6DD0229-990E
 * ingesloten door API.php
 * 
 * JS forms
 *  Public key: CXS-6442630D-D40F
 * 
 * Eerst authentication aanvragen;
 * Daarna alle vacatures ophalen.
 * 
 *  Api-call.php in de root van de plugin voor de Cron-job.
 */

namespace IndrukwekkendVacatures;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define( 'PUBLIC_KEY', get_field('public_key', 'option'));
define( 'SECRET', 		get_field('secret', 'option'));
define( 'BASE_URL', 	get_field('base_url', 'option'));
define( 'DOMAIN', 		'connexys.nl');

/**
 * Class Assets.
 */
class APICall {

	/**
	 * Constructor.
	 */
	public function __construct() {

		// opaheln uit de database
		$bearerToken = get_option( 'bearerToken' );

		if ( $bearerToken == '' ) {
			
			echo 'bearerToken is leeg <br>';
			$this->authenticate();

		} else {		
			//if this is false the token is not valid then we need to authenticate again
			$this->check_token($bearerToken);
		}

	}

	public function authenticate() {

		// 1. JWT key aanmaken.
		$time = time();
		$exp = $time + 900;

		$payload = [
			'iss' => 'Connexys',
			'iat' => $time,
			'exp' => $exp,
			"aud" => "",
			"sub" => "",
			"publicKey" => PUBLIC_KEY,
			'domain' => DOMAIN,
			"baseUrl" => BASE_URL,
		];
		
		try {
			// dit is het encoderen van de JWT key naar connexys.
			$jwt = JWT::encode($payload, SECRET, 'HS256');
			// Testen of de JWT key goed is.
			// echo 'JSON Key: '.$jwt .'<BR>';
			// $decoded = JWT::decode($jwt, new Key(SECRET, 'HS256'));
			// var_dump($decoded);

		} catch (LogicException $e) {
				// errors having to do with environmental setup or malformed JWT Keys
		} catch (UnexpectedValueException $e) {
				// errors having to do with JWT signature and claims
		}

		// 2. JWT key versturen naar Connexys.
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => BASE_URL.'/jwt/auth',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => 'requestToken='.$jwt.'',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-www-form-urlencoded'
			),
		));
		
		$response = curl_exec($curl);

		curl_close($curl);

		//response is een JSON object met daarin de bearerToken.
		// opslaan in de database.
		update_option( 'bearerToken', $response );

	}

	public function check_token( $bearerToken ) {
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => BASE_URL.'/jwt/check',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer ' . $bearerToken . ''
			),
		));
		
		$response = curl_exec($curl);
		
		curl_close($curl);
		// jsondecode the response.
		$response = json_decode($response, true);

		if (  !isset($response['leaseTokenId']) ) {
			// if the token is not valid then we need to authenticate again.
			$this->authenticate();
		} else {
			// if the token is valid then we can call the API.
			// $this->get_vacatures($bearerToken);
			return $bearerToken;
		}
		
	}

	/**
	 * Initialize.
	 */
	public function get_vacatures() {
		$bearerToken = get_option( 'bearerToken' );

		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => BASE_URL.'/jwt/vacancy/all?wt=json&lang=nl',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer ' . $bearerToken . ''
			),
		));

		$response = curl_exec($curl);
		$response = json_decode($response, true);

		curl_close($curl);
		
		return $response['vacancyFeed'];
	}

	public function get_masterdata($set) {
		$bearerToken = get_option( 'bearerToken' );

		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => BASE_URL.'/jwt/masterdata/',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer ' . $bearerToken . ''
			),
		));

		$response = curl_exec($curl);
		$response = json_decode($response, true);

		curl_close($curl);
		
		return $response[$set];
	}

}
