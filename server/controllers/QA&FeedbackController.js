const QuestionModel = require('../models/questions');
const TFeedbackModel = require('../models/teacherfeedback');
const SFeedbackModel = require('../models/servicefeedback');

//-------------Student side question-------------------------------------
//create question
const createque = (req, res) => {
    QuestionModel.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
}

//all questions
const allque = (req, res) => {
    QuestionModel.find()
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//get questions to update
const getupdateque = (req, res) => {
    const id = req.params.id;
    QuestionModel.findById({_id:id})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//update question
const updateque = (req, res) => {
    const id = req.params.id;
    QuestionModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,subject:req.body.subject,teacher:req.body.teacher,sid:req.body.sid,question:req.body.question})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//delete question
const deleteque = (req, res) => {
    const id = req.params.id;
    QuestionModel.findByIdAndDelete({_id:id})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//-------------Teacher side question-------------------------------------
//get not anwered questions 
const getteacherque = (req, res) => {
    QuestionModel.find({answer: {$exists: false}}).select('-answer')
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//give the answer
const giveans = (req, res) => {
    const { id } = req.params;
    QuestionModel.findById(id)
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//update the answer
const updateans = (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    QuestionModel.findByIdAndUpdate(id, { answer }, { new: true })
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//show the answer in THQuestion
const showans = (req, res) => {
    QuestionModel.find({answer: {$exists: true}}).exec()
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//get Answer to update
const getans = (req, res) => {
    const id  = req.params.id;
    QuestionModel.findById({_id:id})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//update Answer
const updateanswer = (req, res) => {
    const id  = req.params.id; 
    QuestionModel.findByIdAndUpdate({_id:id}, { answer :req.body.answer})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

// delete answer
const deleteanswer = (req, res) => {
    const { id } = req.params;
    QuestionModel.findByIdAndUpdate(id, { $unset: { answer: 1 } }, { new: true })
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
}

//faq dispaly
const displayfaq = (req, res) => {
    QuestionModel.find({answer: {$exists: true}})
    .then(allQuestions => {
    const uniqueQuestions = new Set(); // Set to store unique questions

    // Filter out repeated questions and questions with empty answers
    const filteredQuestions = allQuestions.filter(QuestionModel => {
        if (!uniqueQuestions.has(QuestionModel.question) ) {
        uniqueQuestions.add(QuestionModel.question);
        return true; // Include this question
        }
        return false; // Skip repeated question or question with empty answer
    });

    res.json(filteredQuestions);
    })
    .catch(error => {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
    });
}

//fAQ search option
const searchfaq = (req, res) => {
    let { grade, subject } = req.query;
    
    const query = { answer: { $exists: true } };

    // Check if grade is provided and convert to case-insensitive regular expression
    if (grade) {
        grade = new RegExp(grade, 'i');
        query.grade = grade;
    }

    // Check if subject is provided and convert to case-insensitive regular expression
    if (subject) {
        subject = new RegExp(subject, 'i');
        query.subject = subject;
    }

    QuestionModel.find(query)
      .then(allQuestions => {
        const uniqueQuestions = new Set(); // Set to store unique questions
  
        // Filter out repeated questions
        const filteredQuestions = allQuestions.filter(question => {
          if (!uniqueQuestions.has(question.question) ) {
            uniqueQuestions.add(question.question);
            return true; // Include this question
          }
          return false; // Skip repeated question
        });
  
        res.json(filteredQuestions);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
}

//----------------------------------------------------------------------------------------------------------
//create teacher feedback
const createteacherfeedback = (req, res) => {
    TFeedbackModel.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
}

//create service feedback
const createservicefeedback = (req, res) => {
    SFeedbackModel.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
}

//get teacher feedbacks
const getteacherfeedback = (req, res) => {
    TFeedbackModel.find()
    .then(tfeedbacks => res.json(tfeedbacks))
    .catch(err => res.json(err));
}

//get service feedbacks
const getservicefeedback = (req, res) => {
    SFeedbackModel.find()
    .then(sfeedbacks => res.json(sfeedbacks))
    .catch(err => res.json(err));
}

//get teacher feedbck to update
const getteacherfeedbackid = (req, res) => {
    const id = req.params.id;
    TFeedbackModel.findById({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//update teacher feedback
const updateteacherfeedbackid = (req, res) => {
    const id = req.params.id;
    TFeedbackModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,subject:req.body.subject,teacher:req.body.teacher,sid:req.body.sid,feedback:req.body.tfeedback},{ new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//delete teacher feedback
const deleteteacherfeedbackid = (req, res) => {
    const id = req.params.id;
    TFeedbackModel.findByIdAndDelete({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//get service feedback to update
const getservicefeedbackid = (req, res) => {
    const id = req.params.id;
    SFeedbackModel.findById({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//delete service feedback
const deleteservicefeedbackid = (req, res) => {
    const id = req.params.id;
    SFeedbackModel.findByIdAndDelete({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//update service feedback
const updateservicefeedbackid = (req, res) => {
    const id = req.params.id;
    SFeedbackModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,feedback:req.body.sfeedbacks,date:req.body.date},{ new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//-----------------------------------Manager side feedback(service feedback)------------------------------------
//get not anwered service feedback 
const servicefeedbackid = (req, res) => {
    SFeedbackModel.find({reply: {$exists: false}}).select('-reply')
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//get not anwered service feedback 
const giveresponse = (req, res) => {
    const { id } = req.params;
    SFeedbackModel.findById(id)
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//get not anwered service feedback 
const gettoreply = (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;
    SFeedbackModel.findByIdAndUpdate(id, { reply }, { new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//show the reply in ManagerFeedback
const showfeedback = (req, res) => {
    SFeedbackModel.find({reply: {$exists: true}}).exec()
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//get reply to update
const getreply = (req, res) => {
    const id  = req.params.id;
    SFeedbackModel.findById({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//update reply
const updatereply = (req, res) => {
    const id  = req.params.id; 
    SFeedbackModel.findByIdAndUpdate({_id:id}, { reply :req.body.reply})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

//delete reply
const deletereply = (req, res) => {
    const { id } = req.params;
    SFeedbackModel.findByIdAndUpdate(id, { $unset: { reply: 1 } }, { new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
}

module.exports = {
    createque,
    allque,
    getupdateque,
    updateque,
    deleteque,
    getteacherque,
    giveans,
    updateans,
    showans,
    getans,
    updateanswer,
    deleteanswer,
    displayfaq,
    searchfaq,
    createteacherfeedback,
    createservicefeedback,
    getteacherfeedback,
    getservicefeedback,
    getteacherfeedbackid,
    updateteacherfeedbackid,
    deleteteacherfeedbackid,
    getservicefeedbackid,
    deleteservicefeedbackid,
    updateservicefeedbackid,
    servicefeedbackid,
    giveresponse,
    gettoreply,
    showfeedback,
    getreply,
    updatereply,
    deletereply
}