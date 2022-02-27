// !api-key FCJK4nThwg6zqTOIpZcOGmRv5MFS92eBgRzs12gr
var breedName;
var subBreedName;

function fetchImage(data) {
  $('.grid-container').empty();
  data.message.forEach((response) => {
    var imgUrl = response;
    $('.grid-container').append(
      $(document.createElement('img')).attr({
        src: imgUrl,
        width: 200,
      })
    );
  });
}

function getImage(e, breedName, subBreedName) {
  e.preventDefault();
  if (subBreedName !== undefined) {
    $.ajax({
      url:
        'https://dog.ceo/api/breed/' +
        breedName +
        '/' +
        subBreedName +
        '/images',
      methor: 'GET',
      success: fetchImage,
      error: function (error) {
        console.log(error);
      },
    });
  } else {
    $.ajax({
      url: 'https://dog.ceo/api/breed/' + breedName + '/images',
      methor: 'GET',
      success: fetchImage,
      error: function (error) {
        console.log(error);
      },
    });
  }
}

function fetDogNames() {
  $.ajax({
    url: 'https://dog.ceo/api/breeds/list/all',
    methor: 'GET',
    success: function fetchName(result) {
      var breedNames = result.message;
      breedName = Object.keys(breedNames)[0];
      for (let breed in breedNames) {
        var option = $(document.createElement('option'));
        option.append(breed);
        $('#selectBreed').append(option);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$('#selectBreed').change(function () {
  breedName = $(this).val();
  $('#selectSubBreed').empty();
  $.ajax({
    url: 'https://dog.ceo/api/breed/' + breedName + '/list',
    methor: 'GET',
    success: function fetchSubBreed(result) {
      var subBreeds = result.message;
      subBreedName = subBreeds[Object.keys(subBreeds)[0]];
      for (let subBreed in subBreeds) {
        var option = $(document.createElement('option'));
        option.append(subBreeds[subBreed]);
        $('#selectSubBreed').append(option);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
});

$('#selectSubBreed').change(function () {
  subBreedName = $(this).val();
});

$('#get-img').click((e) => getImage(e, breedName, subBreedName));

fetDogNames();
