#cicid 
## Preparation
1. Checkout branch
2. Pod install
3. Remove fastlane folder,  gemfile, gemfile.lock
> [! Info] Apple Key P8 - Appstore Connect API Key
> Kalau manual select sendiri, kalau gak input p8 nanti kita harus manual. Dengan input p8 di fastlane, kita bisa otomatis.
### Appstore Connect Key
1. Users and access
2. Keys
3. Create new 
4. Download the private key. Please note the download can only be done once.
> This API Key, key-id, issuer id (the latter 2 can be found on appstore connect Keys section) is needed to create JWT token authentication

## Fastlane
1. fastlane init
2. fastlane match init -> codesigning for iOS's 
	1. this process generates certificate
	2. Gak boleh naro di repository yang sama

Pilot & deliver -> harus manual manage di appstore connect
Beta automatis 
karena ipa yang di upload bukan ipa yg dienkripsi
