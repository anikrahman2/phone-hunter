const loadPhones = async (search = 'iphone', dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phone-container');
  phonesContainer.innerHTML = '' ;
  const showAll = document.getElementById('show-all')
  if(dataLimit && phones.length > 10){
    showAll.classList.remove('d-none');
    phones = phones.slice(0, 10);
  }
  else{
    showAll.classList.add('d-none')
  }
  const notFound = document.getElementById('not-found');
  if(phones.length === 0){
    notFound.classList.remove('d-none');
    loader(false)
  }
  else{
    notFound.classList.add('d-none');
    loader(true)
  }
    phones.forEach(phone => {
      const phoneDiv = document.createElement('div');
      phoneDiv.classList.add('col')
      phoneDiv.innerHTML = `
        <div class="card rounded-5 p-4">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary w-50 mx-auto" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detail</button>
        </div>
      `;
      phonesContainer.appendChild(phoneDiv);
      loader(false);
    });
  
};
const processSearch = (dataLimit) => {
  loader(true);
  const searchElement = document.getElementById('search-field');
  const searchValue = searchElement.value;
  loadPhones(searchValue, dataLimit);
};
const search = () => {
  processSearch(10);
};
const loader = (isLoading) => {
  const loading = document.getElementById('loader');
  if(isLoading){
    loading.classList.remove('d-none');
  }
  else{
    loading.classList.add('d-none');
  }
};
document.getElementById('btn-show-all').addEventListener('click', () => {
  processSearch();
});
const loadPhoneDetails = async(slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
};
const displayPhoneDetail = phoneInfo => {
  console.log(phoneInfo);
  document.getElementById('phoneDetailModalLabel').innerText = `${phoneInfo.name}`
  const cardBody = document.getElementById('card-body');
  cardBody.innerHTML = `
    <img src="${phoneInfo.image}" alt="Phone Image">
    <h5 class="fw-bold">Brand: ${phoneInfo.brand}</h5>
    <p>Release Date: ${phoneInfo.releaseDate ? phoneInfo.releaseDate : 'No Release Date'}</p>
    <p>Chip Set: ${phoneInfo.mainFeatures.chipSet}</p>
    <p>Storage: ${phoneInfo.mainFeatures.storage}</p>
    <p>Display Size: ${phoneInfo.mainFeatures.displaySize}</p>
    <p>RAM: ${phoneInfo.mainFeatures.memory}</p>
    <p>Bluetooth: ${phoneInfo.others ? phoneInfo.others.Bluetooth : 'N/A'}</p>
    <p>NFC: ${phoneInfo.others ? phoneInfo.others.NFC : 'N/A'}</p>
    <p>GPS: ${phoneInfo.others ? phoneInfo.others.GPS : 'N/A'}</p>
    <p>Radio: ${phoneInfo.others ? phoneInfo.others.Radio : 'N/A'}</p>
    <p>USB: ${phoneInfo.others ? phoneInfo.others.USB : 'N/A'}</p>
    <p>WLAN: ${phoneInfo.others ? phoneInfo.others.WLAN : 'N/A'}</p>
  `
};
document.getElementById('search-field').addEventListener('keyup', function(event){
  if(event.key === 'Enter'){
    processSearch(10);
  }
})

loadPhones();