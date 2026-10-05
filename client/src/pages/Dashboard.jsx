import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import SectionCard from '../components/SectionCard';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import BrandLogo from '../components/BrandLogo';
import { Target, Server, Shield, Box, PlusCircle, Edit3, Trash2, Save, X, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  async function fetchProjects(token) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    void Promise.resolve().then(() => fetchProjects(token));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        navigate(`/projects/${data._id}/idea-brd`);
      } else {
        setError(data.message || 'Error creating project');
      }
    } catch {
      setError('Error connecting to server');
    }
  };

  const handleUpdateProject = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: editName, description: editDescription })
      });
      if (res.ok) {
        setEditingProjectId(null);
        fetchProjects(token);
      }
    } catch (err) {
      console.error('Error updating project', err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to completely delete this project? This cannot be undone.')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProjects(token);
      }
    } catch (err) {
      console.error('Error deleting project', err);
    }
  };

  return (
    <div className="dashboard-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh', backgroundColor: 'var(--bg-base)', position: 'relative' }}>
      {/* Dashed Grid */}
      <div
        className="app-grid-backdrop"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <nav className="responsive-nav app-nav" style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 32px', 
        backgroundColor: 'var(--bg-surface)', 
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--text-primary)', 
        height: '64px', 
        zIndex: 10,
        position: 'relative'
      }}>
        <BrandLogo />
        <div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </nav>

      <div className="animate-fade-in module-padding dashboard-content" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
        <div className="dashboard-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <span className="app-eyebrow"><span className="brand-live-dot" /> YOUR NEXT GREAT BUILD</span>
            <h1 className="app-page-title" style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Your Projects</h1>
            <p style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.6' }}>
              Select a project to manage its requirements, test cases, and traceability matrix.
            </p>
          </div>
          <Button 
            variant={showForm ? 'secondary' : 'primary'}
            onClick={() => { setShowForm(!showForm); setError(''); setName(''); setDescription(''); }}
          >
            {showForm ? 'Cancel' : <><PlusCircle size={18} /> New Project</>}
          </Button>
        </div>

        <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <StatCard title="Total Projects" value={projects.length} color="var(--accent-color)" icon={Target} />
          <StatCard title="Status" value="Online" color="var(--success)" icon={Server} />
          <StatCard title="Plan" value="Free" color="var(--accent-color)" icon={Shield} />
        </div>

        {showForm && (
          <div style={{ marginBottom: '40px' }}>
            <SectionCard title="Create a New Project">
              {error && (
                <div style={{ padding: '12px', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontWeight: '500', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    placeholder="e.g., E-Commerce Platform"
                    style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description (optional)</label>
                  <input 
                    type="text" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="A short description of what this project is about."
                    style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <Button type="submit" variant="primary">
                    <Server size={18} /> Create Project
                  </Button>
                </div>
              </form>
            </SectionCard>
          </div>
        )}

        <div className="project-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {projects.length === 0 && !showForm ? (
            <div style={{ gridColumn: '1 / -1' }}>
              <EmptyState 
                message="No projects yet. Click 'New Project' above to create your first one." 
                iconName="layers" 
              />
            </div>
          ) : (
            projects.map(project => {
              const isEditing = editingProjectId === project._id;
              
              return (
                <div className="app-project-card" key={project._id} style={{
                  backgroundColor: 'var(--bg-card)', 
                  border: isEditing ? '1px solid var(--accent-color)' : '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isEditing ? 'var(--shadow-lg)' : 'var(--shadow-md)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                  position: 'relative'
                }}
                onMouseOver={e => { if (!isEditing) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--accent-color)'; } }}
                onMouseOut={e => { if (!isEditing) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--border-color)'; } }}
                >
                  <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
                    {!isEditing && (
                      <>
                        <button onClick={() => { setEditingProjectId(project._id); setEditName(project.name); setEditDescription(project.description || ''); }} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '4px' }} title="Rename Project">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDeleteProject(project._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }} title="Delete Project">
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  <div>
                    {isEditing ? (
                      <form onSubmit={(e) => handleUpdateProject(e, project._id)} style={{ marginBottom: '24px' }}>
                         <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          required
                          placeholder="Project Name"
                          style={{ width: '100%', padding: '8px 12px', marginBottom: '12px', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}
                        />
                         <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description"
                          rows={3}
                          style={{ width: '100%', padding: '8px 12px', marginBottom: '16px', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.9rem', resize: 'vertical' }}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button type="submit" variant="primary" size="sm" style={{ flex: 1 }}><Save size={16} /> Save</Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setEditingProjectId(null)} style={{ flex: 1 }}><X size={16} /> Cancel</Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingRight: '48px' }}>
                          <div style={{ padding: '8px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-color)' }}>
                            <Box size={24} />
                          </div>
                          <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: '500', fontFamily: 'var(--font-heading)', lineHeight: 1.3, wordBreak: 'break-word' }}>{project.name}</h3>
                        </div>
                        <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.8rem' }}>
                          {project.description || 'No description provided.'}
                        </p>
                      </>
                    )}
                  </div>
                  
                  {!isEditing && (
                    <Link className="app-button app-button--secondary app-button--md app-project-open" to={`/projects/${project._id}/requirements`}>
                      Open Project <ArrowUpRight size={15} />
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
