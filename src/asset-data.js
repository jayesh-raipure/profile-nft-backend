const faker = require('faker');
const _ = require('lodash');


const name = faker.name;
const phone = faker.phone;
const internet = faker.internet;
const company = faker.company;
const random = faker.random;

const educations = [
    "BE (Mech)",
    "BE (CSE)",
    "BE (IT)",
    "B.Tech",
    "M.Tech",
    "MCA",
    "MBA"
];

const technologies = [
    "PHP",
    "Nodejs",
    "java",
    "javaScript",
    "Angular",
    "reactJs",
    "AWS"
]

module.exports = _.times(100, () => {
    let firstName = name.firstName();
    let lastName = name.lastName();
    let randomNumner = Math.floor(Math.random() * (6 - 1) + 1);
    let education = _.sampleSize(educations, 1);
    let technology = _.sampleSize(technologies, randomNumner);
    let uid = `${firstName}_${lastName}_${random.uuid()}`;
    if(randomNumner%2 == 0){
        var gender = "male";
    } else {
        var gender = "female";
    }
    return {
        candidate_name: `${firstName} ${lastName}`,
        current_ctc: Math.floor(Math.random() * (50 - 3) + 3),
        first_name: firstName,
        id: uid,
        last_name: lastName,
        gender,
        owner: `${firstName} ${lastName}`,
        phone: phone.phoneNumber(),
        email: internet.email(),
        education: education[0],
        experience: Math.floor(Math.random() * (20 - 3) + 3),
        current_company: company.companyName(),
        technologies: technology.join(","),
        resume_id: uid,
        metaMask_token: "0x60b56dd0c1c7ab3e9453f7962A5D51eF31b5E875",
        docType: "asset"
    };
});


