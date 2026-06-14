import React, { useState } from 'react';
import { CheckCircle2, Hammer, BadgeCheck, DollarSign, Check } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const WorkerOnboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customCategory, setCustomCategory] = useState('');

  const [formData, setFormData] = useState({
    experience: '1-3 years',
    hourlyRate: '',
    certification: null,
    isSubmitting: false,
    successMessage: '',
    errorMsg: ''
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, certification: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const finalCategory = selectedCategory === 'Other' ? customCategory.trim() : selectedCategory;
    if (!finalCategory || !formData.hourlyRate) {
      setFormData({ ...formData, errorMsg: 'Please select a trade and specify your hourly rate.' });
      return;
    }

    setFormData({ ...formData, isSubmitting: true, errorMsg: '' });

    const data = new FormData();
    data.append('service', finalCategory);
    data.append('experience', formData.experience);
    data.append('hourlyRate', formData.hourlyRate);
    if (formData.certification) {
      data.append('image', formData.certification); 
    }

    try {
      const response = await fetch(`${API_URL}/api/workers/onboard`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: data 
      });
      
      const resData = await response.json();
      
      if(response.ok) {
        setFormData({ ...formData, successMessage: 'Profile submitted successfully!', isSubmitting: false });
        
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...userData, role: resData.role || 'worker' }));
        
        setTimeout(() => {
          setFormData(prev => ({...prev, successMessage: ''}));
          window.location.href = '/profile';
        }, 2000);
      } else {
        setFormData({ ...formData, errorMsg: resData.message || 'Submission failed.', isSubmitting: false });
      }
    } catch (err) {
      console.error(err);
      setFormData({ ...formData, errorMsg: 'Server error, please try again.', isSubmitting: false });
    }
  };



  const categories = ['Plumbing', 'Electrical', 'Painting', 'Carpentry', 'Flooring', 'Cleaning', 'Other'];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden">
        
        <div className="bg-slate-900 p-6 md:p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-black">Professional Onboarding</h1>
            <p className="text-slate-400 text-sm font-medium">
              Step {step} of 2: {step === 1 ? 'Expertise' : 'Verification'}
            </p>
          </div>
          <div className="flex gap-2">
            <div className={`h-2 w-8 md:w-12 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-amber-400' : 'bg-slate-700'}`} />
            <div className={`h-2 w-8 md:w-12 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-amber-400' : 'bg-slate-700'}`} />
          </div>
        </div>

        <form className="p-6 md:p-10" onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div>
                <label className="block text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Hammer className="text-amber-500" size={20} /> What is your primary trade?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`
                          relative py-3 md:py-4 px-3 md:px-4 rounded-2xl font-bold transition-all duration-200 
                          flex items-center justify-center gap-2 overflow-hidden text-sm md:text-base
                          ${isSelected 
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-200 ring-2 ring-amber-500 scale-[1.02]' 
                            : 'bg-white text-slate-600 border-2 border-slate-100 hover:border-amber-300 hover:bg-amber-50'
                          }
                        `}
                      >
                        {isSelected && <Check size={18} className="animate-in zoom-in duration-300" />}
                        {cat}
                        {isSelected && <div className="absolute inset-0 bg-white/10 blur-xl"></div>}
                      </button>
                    );
                  })}
                </div>

                {selectedCategory === 'Other' && (
                  <div className="mt-6 p-4 md:p-5 bg-amber-50/50 rounded-2xl border border-amber-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Enter your custom trade</label>
                    <input 
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="e.g. Welder, Locksmith, Mason, Roofer"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-medium text-slate-700 transition-all focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Years of Experience</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-medium text-slate-700 transition-all"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hourly Rate ($)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={16} />
                    <input 
                      type="number" 
                      placeholder="25" 
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500 transition-all" 
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!selectedCategory || (selectedCategory === 'Other' && !customCategory.trim())}
                className={`w-full py-4 font-black rounded-2xl shadow-lg transition-all duration-300
                  ${(selectedCategory && (selectedCategory !== 'Other' || customCategory.trim())) 
                    ? 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-amber-200 active:scale-95' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
              >
                Continue to Verification
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-5 md:p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                <BadgeCheck className="text-amber-600 shrink-0" size={24} />
                <p className="text-sm text-amber-800 leading-relaxed font-medium">
                  To ensure quality, you can upload a valid ID or Business License, or skip this step to upload it later. All submitted documents are encrypted.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4">Upload Professional Certification / ID (Optional)</label>
                
                <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-8 md:p-12 text-center hover:border-amber-400 transition-all cursor-pointer group bg-slate-50/50">
                  <input 
                    type="file" 
                    id="certificate-upload"
                    accept="image/jpeg, image/png, application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                  />
                  <div className={`w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors shadow-sm ${formData.certification ? 'bg-green-100' : 'bg-white group-hover:bg-amber-50'}`}>
                    <CheckCircle2 className={`${formData.certification ? 'text-green-500' : 'text-slate-400 group-hover:text-amber-500'} transition-colors`} />
                  </div>
                  
                  {formData.certification ? (
                     <div className="text-green-600 font-bold text-sm md:text-base break-all">{formData.certification.name}</div>
                  ) : (
                    <>
                      <p className="text-slate-600 font-bold text-sm md:text-base">Click to upload or drag and drop</p>
                      <p className="text-slate-400 text-xs mt-1">PDF, JPG or PNG (max. 10MB)</p>
                    </>
                  )}
                </div>
              </div>
              
              {formData.errorMsg && (
                <div className="p-4 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-200 text-center">
                  {formData.errorMsg}
                </div>
              )}
              
              {formData.successMessage && (
                <div className="p-4 bg-green-50 text-green-600 font-bold rounded-2xl border border-green-200 text-center">
                  {formData.successMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)} 
                  className="w-full sm:flex-1 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                  disabled={formData.isSubmitting}
                >
                  Back
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={formData.isSubmitting}
                  className={`w-full sm:flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl transition-all shadow-xl hover:bg-black active:scale-95
                    ${formData.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {formData.isSubmitting ? 'Submitting...' : formData.certification ? 'Complete Application' : 'Skip & Complete Application'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WorkerOnboarding;
