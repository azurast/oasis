# Preparation
1. Install Homebrew
2. Install Cocoapods
3. Install Bundle
4. Install Fastlane
5. Make sure udah bisa upload ke appstore dari XCode secara manual

> [! warning]
> Error di fastlane ini cukup general jadi harus dicari sendiri salahnya dimana dan cara fixnya

> [! info] Why fastlane?
> Github actions selalu gagal 
> Credentials kita harus dikirim ke mereka (expect p8/p2 credentials)
> p12 bisa diambil dari keychain (apple distribution) di export to local
> setiap export credentials akan minta set password, yang kedua password laptop

# Local CI/CD
1. Buka terminal
2. `fastlane init`
3. Akan ditanya kegunaan fastlane nya untuk apa, pilih no 4 manual setup (kalau belum pernah pakai fastlane bisa pilih no 2/3 untuk login konekin dengan appstoreconnect di local)
4. `Appfile` sama `Fastfile` akan tergenerate secara otomatis. Fastfile untuk menaruh fungsi2 fastlane, sedangkan appfile berisikan identifiers dari hal2 yang dibutuhkan untuk app agar bisa terintegrate dengan fastlane.
5. Create Apple Application Specific Password (cuman akan muncul sekali, harus disimpan)
6. Buka folder `fastlane`, kalau `Appfile` nya kosong berarti belum login, pilih no 2 dan 3
7. Buat `.env` file
8. Taro keys di `.env` file

# Setup Functions
[[Fastfile & ENV]]
1. Copy function untuk naikin ke testflight
2. Build version value diganti secara manual
3. Jika menggunakan function `upload_to_testflight` udah gausah di klik manage2, sedangkan `build_app` hanya untuk menghasilkan `.ipa` file
4. `fastlane <nama func>`
5. Kalau ini berhasil udah bisa ke testflight (tapi ini gak auto increment)
6. `pilot` dan `upload_to_testflight` sama, cuman pilot manual approve
7. Kalau mau naik ke appstore bisa pakai `deliver` atau `upload_to_appstore`, kita pakainya deliver
8. pilot butuh `credential p8 yg di convert ke base 84` dan `login to apple`
9. sebelum menjalankan pilot ada beberapa func yang harus di jalanin dulu
10. `fastlane run_local_deployment` dan bakal ada prompt untuk pilih configurationnya

> [! question] Kapan pake pilot?
> Kalau sudah terhubung dengan github

> [!info] setup_produce
> ketika pake xcode berhasil tapi fastlane gagal, kalau udah di comment, nanti akan masuk identifiers di appstoreconnect
> 

11. Untuk embed p8 harus di konekin sama fastlane match. Ke xcode, provisioning profile, select match appstore (ini adalah output dari menjalankan function `fastlane match appstore` ini hanya dijalankan sekali!) ini nanti adanya di profiles appstoreconnect. Bisa 1 dipakai bersama makanya bisa di download. 
12. Convert p8 original ke base 64 menggunakan `base64 path_to-pb8 | pbcopy`
13. p8 ambil dari appstore connect (Users and Access -> Keys) ini juga cuman bisa sekali di generate
14. `increment_build_number_from_latest_testflight_local` ini digunakan untuk auto incremen version build
15. Target by (target yg ada di xcode) dia ngambil versi aplikasi saat ini dan dikirim ke test flight, dia akan increment dari value itu
16. ! karena multiple flavor harus di adjust per bundle identifier
17. `current_build` kepake kalau konek dengan github
18. method of distribution = match 
19. `load_gym_configuration` untuk generate signed ipa or app file
20. kalau udh berhasil upload, jangan lupa delete keychain, jadi duplicate nnti malah gabisa
21. 1 func 1 flavor

> [!info] 
> Ketika melakukan match_appstore, akan disuruh taro sertif dimana, lebih baik di repo yang berbeda 

# Github
* Side Note Reza: match() kasih conditional based on needs
* 😅💨🚃🚃