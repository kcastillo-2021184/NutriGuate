import mongoose from 'mongoose';

const dietSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  edad: { 
    type: Number, 
    required: true 
  },
  genero: { 
    type: String, 
    required: true 
  },
  peso: { 
    type: Number, 
    required: true 
  },
  altura: { 
    type: Number, 
    required: true 
  },
  actividadFisica: { 
    type: String, 
    required: true, 
    enum: ['Sedentario','Ligera','Moderada','Intensa','Alto Rendimiento'],
    default: 'Moderada'
  },
  condicionMedica: { 
    type: String, 
    required: false 
  },
  presupuestoMensual: { 
    type: Number, 
    required: true 
  },
  preferenciasAlimentarias: { 
    type: String, 
    required: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Diet', dietSchema);
