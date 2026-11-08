# PERTANYAAN
1. State Management & Lifecycle
2. Struktur Folder:
3. Optimasi Kinerja (Performance)

- JAWABAN
1. Statet Management & Lifecycle
### State Managements
- State managements yang saya pakai di project ini menggunkana  useStatte, useRef dan useEffect
- useState : untuk kondisi yes or no atau jika ada data kosong atau data nya ada maka akan melakukan action seperti apa
- useRef : adalah state menjalankan sebauh action tanpa merubah ui jadi users tidak tau apakah di balik layar gimana
- useEffect : ini sebenarnya bukan state sih ini adalah fungsi dari bawaan js yang dimana untuk melakukan proses sebuah data yang di render untuk pertama kali atau sebagai nya

### Lifecycle
- Siklus hidup (Life Cycle) komponen React JS terbagi menjadi 3 fase 
1. Mounting
2. Updating
3. Unmounting 

### mencegah infinte loopm
```
 useEffect(() => {
        getallDataUsers()

        return () => {
            if (debounse.current) {
                clearTimeout(debounse.current)
            }
        }
    }, [users])
```

- untuk mencegah infinet loop dan memory leak yang terlalu naik maka kita defisikan di bagian useeffect 
untuk mendefisikan state users, yang dimana dia akan melakukan proses data sekali dan jika ada perubahan maka akan berdasarkan apakah ada perubahan di users ada atau tidak jika ada maka lakukan perubahan jika tidak yah tidak akan melakukan proses render api terus menerus

2. Struktur Folder:
pada project ini aku pakai folder yang cukup mudah di pakai dan lebih fokuskan ke jadi MVP agar mudah
selesai dan nanti akan pelan-pelan di ubah

folder-folder :
- /components : folder ini adalah tempat pembuatan components
- /hooks : adalah folder untuk hooks atau action yang akan di buat agar tidak menjadi satu dengan ui
- /page : adalah folder untuk menyimpan letak page pada website
- /layoust : adalah folder untuk menyimpan layouts-layouts sebauh webiste semisal halaman webiste, dashboard, dan login, register
- router : adalah tempat mengarah url pada webiste ini dan pakai react-router-dom agar pas pindah-pindah tidak usah reload ulang semuanya

3. Optimasi Kinerja
- permasalahan jika kondisi ada api request 1000 request
- solusi nya adalah : gunakana sebuah state managements useMemo untuk memfilter pada request-request tertentu
dan minta melakukan validasi jika banyak request maka request tersebut kita tahan beberapa request kenapa begitu agar
UI/INTERFACE tidak lemot dan di bagian server tidak berat jadi harus imbang semuanya tidak boleh salah satua nya yang di prioritaskan