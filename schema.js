/**
 * This is a Schema defining file for the application
 * and this's a entry for the schema structure
 * @author Tang Bo Hao
 */

// Module dependences
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//  ----------- Player Model -----------
var PlayerSchema = new Schema({
	userid: { type: String, required: true, unique: true},
	name: { type: String, required: true},
	imageUrl: String,
	gender: Boolean, // True is male, False is female
	
	authorized_user: Schema.Types.Mixed, // authorize data
	last_account_sync: Date, // last time sync data
	
	allies: [{ type: ObjectId, ref: 'Player' }],

	level: { type: Number, min: 1, max: 99, 'default': 1},
	exp: { type: Number, min: 0, 'default': 0},

});

// the level calculated by fame
PlayerSchema.virtual('general.reallevel')
.get(function() {
	//TODO using settings file
	return 1;
})
.set(function (lvl) {
  //TODO
});

/* ----- Define Models ------ */
mongoose.model('Player', PlayerSchema);