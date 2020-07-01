document.addEventListener('DOMContentLoaded', () => {
	const imgup = document.getElementById('imgup1');
	imgup.addEventListener('dragover', highlighted);

	imgup.addEventListener('dragleave', unhighlighted);

	document.body.addEventListener('dragover', function (evt) {
		evt.preventDefault();
	});
	document.body.addEventListener('drop', loadImage, false);
});

function highlighted(ev) {
	document.getElementById('imgup1').style.background = '#a9cefc';
	document.getElementById('text1').style.display = 'none';
}

function unhighlighted() {
	document.getElementById('imgup1').style.background = 'rgb(240, 255, 254)';
	document.getElementById('text1').style.display = 'block';
}
function loadImage(ev) {
	ev.stopPropagation();
	ev.preventDefault();

	let file = ev.dataTransfer.files[0];
	// console.log(file);
	f1 = new FormData();
	f1.append('imgupld', file);
	document.getElementById('igt1').src = URL.createObjectURL(file);
	document.getElementById('igt1').style.display = 'block';
	bfup = document.getElementById('bfload');
	bfup.style.display = 'block';
	bfup.style.height = '100%';
	bfup.style.width = '100%';
	fetch('/uploadimage', {
		method: 'POST',
		credentials: 'same-origin',
		body: f1
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			bfup.style.display = 'none';
			// document.getElementById('label1').innerText = data;
		})
		.catch((err) => {
			console.log(err);
		});
}
