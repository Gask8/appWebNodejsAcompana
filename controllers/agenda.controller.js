const { response } = require ('express');
const Doliente = require("../models/doliente.model.js");
const Voluntario = require("../models/voluntario.model.js");
const Escucha = require("../models/escucha.model.js");
const Horario = require("../models/horario.model.js");

const getAgenda = async (req, res) => {
	
	/*
	res.render('agenda',{
		text: ''
	});
	*/
	
};

const postAgenda = async (req, res) => {

};

const putAgenda = async (req, res) => {

	const id = req.params.id;
	
};

const deleteAgenda = async (req, res) => {

	const id = req.params.id;
	
};



module.exports = {
	getAgenda,
	postAgenda,
	putAgenda,
	deleteAgenda
}