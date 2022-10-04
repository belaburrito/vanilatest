const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
//convert date object to days of the week

fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error" + response.status);
    }
    return response.json();
})
.then(json => {
    json.forEach(function(data) { //create a new p-card for every element
        const row = document.querySelector('div');

        const col = document.createElement('div')
        col.classList.add('col-4', 'p-card--highlighted');

        const header = document.createElement('header');
        header.classList.add('p-card__header');

        const h5 = document.createElement('h5');
        h5.classList.add('p-text--x-small-capitalised', 'u-no-margin--bottom');

        h5.innerHTML=data._embedded["wp:term"][1][0].name;

        const content = document.createElement('div');
        content.classList.add('p-card__content');

        const img = document.createElement('img');
        img.classList.add('p-card__image');
        img.src = data.featured_media;

        const h3 = document.createElement('h3');
        h3.classList.add('p-heading--4');

        const a = document.createElement('a');
        a.innerHTML = data.title.rendered;
        a.href = data.link;

        const p = document.createElement('p');
        p.innerHTML='By ';

        const em = document.createElement('em');

        const a2 = document.createElement('a');
        a2.innerHTML = data._embedded.author[0].name;
        a2.href = data._embedded.author[0].url;

        const date = new Date(data.date);
        const em2 = document.createElement('em');
        em2.innerHTML = ' on ' + date.getDate() + ' ' + days[date.getDay()] + ' ' + date.getFullYear();

        const footer = document.createElement('p');
        footer.classList.add('p-card__footer');
        footer.innerHTML= data._embedded["wp:term"][0][0].name;

        header.append(h5);

        h3.append(a);
        content.append(img);
        content.append(h3);

        em.append(a2);
        p.append(em);
        p.append(em2);
        content.append(p);
        
        col.append(header);
        col.append(content);
        col.append(footer);

        row.append(col);
        console.log(data);
    })
    return json;
})
.catch(err => {
    console.log(err);
})
