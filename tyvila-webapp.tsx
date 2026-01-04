import React, { useState, useEffect } from 'react';
import { Music, Video, FileText, Upload, Users, Instagram, Facebook, Twitter, Youtube, ExternalLink, Play, Calendar, MapPin, Menu, X, Lock, LogOut, Home, BarChart, Edit, Trash2, Eye } from 'lucide-react';

const TyvilaOnline = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [content, setContent] = useState({
    albums: [],
    videos: [],
    articles: [],
    team: []
  });

  useEffect(() => {
    checkAuth();
    loadContent();
  }, []);

  const checkAuth = async () => {
    try {
      const authResult = await window.storage.get('admin_session', false);
      if (authResult) {
        const session = JSON.parse(authResult.value);
        if (session.expiresAt > Date.now()) {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  const loadContent = async () => {
    try {
      const albumsResult = await window.storage.list('albums:', false);
      const videosResult = await window.storage.list('videos:', false);
      const articlesResult = await window.storage.list('articles:', false);
      const teamResult = await window.storage.list('team:', false);

      const loadedAlbums = [];
      const loadedVideos = [];
      const loadedArticles = [];
      const loadedTeam = [];

      if (albumsResult?.keys) {
        for (const key of albumsResult.keys) {
          try {
            const result = await window.storage.get(key, false);
            if (result) loadedAlbums.push({ ...JSON.parse(result.value), storageKey: key });
          } catch (e) {}
        }
      }

      if (videosResult?.keys) {
        for (const key of videosResult.keys) {
          try {
            const result = await window.storage.get(key, false);
            if (result) loadedVideos.push({ ...JSON.parse(result.value), storageKey: key });
          } catch (e) {}
        }
      }

      if (articlesResult?.keys) {
        for (const key of articlesResult.keys) {
          try {
            const result = await window.storage.get(key, false);
            if (result) loadedArticles.push({ ...JSON.parse(result.value), storageKey: key });
          } catch (e) {}
        }
      }

      if (teamResult?.keys) {
        for (const key of teamResult.keys) {
          try {
            const result = await window.storage.get(key, false);
            if (result) loadedTeam.push({ ...JSON.parse(result.value), storageKey: key });
          } catch (e) {}
        }
      }

      setContent({
        albums: loadedAlbums.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)),
        videos: loadedVideos.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)),
        articles: loadedArticles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)),
        team: loadedTeam
      });
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const socialLinks = {
    instagram: '#',
    facebook: '#',
    twitter: '#',
    youtube: '#'
  };

  const companyInfo = {
    name: 'Tyvila Online',
    location: 'Benoni, Gauteng, RSA',
    tagline: 'Where Music Meets Culture'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-black/30 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Music className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Tyvila Online</h1>
                <p className="text-xs text-purple-300">Where Music Meets Culture</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {!isAuthenticated ? (
                <>
                  <button onClick={() => setActiveTab('home')} className={`transition ${activeTab === 'home' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Home</button>
                  <button onClick={() => setActiveTab('music')} className={`transition ${activeTab === 'music' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Music</button>
                  <button onClick={() => setActiveTab('videos')} className={`transition ${activeTab === 'videos' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Videos</button>
                  <button onClick={() => setActiveTab('articles')} className={`transition ${activeTab === 'articles' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Articles</button>
                  <button onClick={() => setActiveTab('team')} className={`transition ${activeTab === 'team' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Team</button>
                  <button onClick={() => setShowAdminLogin(true)} className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                    <Lock className="w-4 h-4" />
                    <span>Admin</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setActiveTab('admin-dashboard')} className={`transition ${activeTab === 'admin-dashboard' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Dashboard</button>
                  <button onClick={() => setActiveTab('admin-content')} className={`transition ${activeTab === 'admin-content' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Manage Content</button>
                  <button onClick={() => setActiveTab('admin-upload')} className={`transition ${activeTab === 'admin-upload' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Upload New</button>
                  <button onClick={() => { setActiveTab('home'); setIsAuthenticated(false); window.storage.delete('admin_session', false); }} className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {!isAuthenticated ? (
                <>
                  <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Home</button>
                  <button onClick={() => { setActiveTab('music'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Music</button>
                  <button onClick={() => { setActiveTab('videos'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Videos</button>
                  <button onClick={() => { setActiveTab('articles'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Articles</button>
                  <button onClick={() => { setActiveTab('team'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Team</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setActiveTab('admin-dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Dashboard</button>
                  <button onClick={() => { setActiveTab('admin-content'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Manage Content</button>
                  <button onClick={() => { setActiveTab('admin-upload'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded">Upload New</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {!isAuthenticated ? (
            <>
              {activeTab === 'home' && <HomeSection content={content} companyInfo={companyInfo} />}
              {activeTab === 'music' && <MusicSection albums={content.albums} />}
              {activeTab === 'videos' && <VideosSection videos={content.videos} />}
              {activeTab === 'articles' && <ArticlesSection articles={content.articles} />}
              {activeTab === 'team' && <TeamSection team={content.team} companyInfo={companyInfo} />}
            </>
          ) : (
            <>
              {activeTab === 'admin-dashboard' && <AdminDashboard content={content} />}
              {activeTab === 'admin-content' && <AdminManageContent content={content} setContent={setContent} loadContent={loadContent} />}
              {activeTab === 'admin-upload' && <AdminUpload content={content} setContent={setContent} loadContent={loadContent} />}
            </>
          )}
        </div>
      </div>

      {showAdminLogin && <AdminLogin setShowAdminLogin={setShowAdminLogin} setIsAuthenticated={setIsAuthenticated} setActiveTab={setActiveTab} />}

      <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{companyInfo.location}</span>
            </div>
            <div className="flex space-x-4">
              <a href={socialLinks.instagram} className="text-gray-400 hover:text-purple-400 transition"><Instagram className="w-5 h-5" /></a>
              <a href={socialLinks.facebook} className="text-gray-400 hover:text-purple-400 transition"><Facebook className="w-5 h-5" /></a>
              <a href={socialLinks.twitter} className="text-gray-400 hover:text-purple-400 transition"><Twitter className="w-5 h-5" /></a>
              <a href={socialLinks.youtube} className="text-gray-400 hover:text-purple-400 transition"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-500 text-sm">
            © 2025 Tyvila Online. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const AdminLogin = ({ setShowAdminLogin, setIsAuthenticated, setActiveTab }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (username === 'admin' && password === 'tyvila2025') {
      const session = {
        username: username,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000)
      };
      await window.storage.set('admin_session', JSON.stringify(session), false);
      setIsAuthenticated(true);
      setShowAdminLogin(false);
      setActiveTab('admin-dashboard');
    } else {
      setError('Invalid credentials. Use username: admin, password: tyvila2025');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-900 to-black border border-purple-400 rounded-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-400">Access the admin dashboard</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter password"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition"
          >
            Login
          </button>

          <button
            onClick={() => setShowAdminLogin(false)}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-200 text-xs text-center">
            Demo credentials: admin / tyvila2025
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ content }) => {
  const stats = [
    { label: 'Total Albums', value: content.albums.length, icon: Music, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Videos', value: content.videos.length, icon: Video, color: 'from-blue-500 to-purple-500' },
    { label: 'Total Articles', value: content.articles.length, icon: FileText, color: 'from-green-500 to-blue-500' },
    { label: 'Team Members', value: content.team.length, icon: Users, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back! Manage your content here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Recent Albums</h3>
          <div className="space-y-3">
            {content.albums.slice(0, 5).map((album, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <Music className="w-5 h-5 text-purple-400" />
                <div className="flex-1">
                  <div className="text-white font-medium">{album.name}</div>
                  <div className="text-gray-400 text-sm">{album.artist}</div>
                </div>
              </div>
            ))}
            {content.albums.length === 0 && (
              <p className="text-gray-400 text-center py-4">No albums yet</p>
            )}
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Recent Articles</h3>
          <div className="space-y-3">
            {content.articles.slice(0, 5).map((article, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <FileText className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <div className="text-white font-medium">{article.title}</div>
                  <div className="text-gray-400 text-sm">{new Date(article.publishDate).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
            {content.articles.length === 0 && (
              <p className="text-gray-400 text-center py-4">No articles yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminManageContent = ({ content, setContent, loadContent }) => {
  const [activeContentType, setActiveContentType] = useState('albums');

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete "${item.name || item.title}"?`)) {
      try {
        await window.storage.delete(item.storageKey, false);
        await loadContent();
        alert('Content deleted successfully!');
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('Error deleting content. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Manage Content</h1>
        <p className="text-gray-400">Edit or delete your existing content</p>
      </div>

      <div className="flex space-x-2">
        <button onClick={() => setActiveContentType('albums')} className={`px-4 py-2 rounded-lg transition ${activeContentType === 'albums' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Albums</button>
        <button onClick={() => setActiveContentType('videos')} className={`px-4 py-2 rounded-lg transition ${activeContentType === 'videos' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Videos</button>
        <button onClick={() => setActiveContentType('articles')} className={`px-4 py-2 rounded-lg transition ${activeContentType === 'articles' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Articles</button>
        <button onClick={() => setActiveContentType('team')} className={`px-4 py-2 rounded-lg transition ${activeContentType === 'team' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Team</button>
      </div>

      <div className="space-y-4">
        {activeContentType === 'albums' && content.albums.map((album, idx) => (
          <div key={idx} className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{album.name}</h3>
                <p className="text-gray-400 text-sm">{album.artist}</p>
                <p className="text-gray-500 text-xs">{new Date(album.releaseDate).toLocaleDateString()}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(album)} className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition">
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}

        {activeContentType === 'videos' && content.videos.map((video, idx) => (
          <div key={idx} className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.description}</p>
                <p className="text-gray-500 text-xs">{new Date(video.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(video)} className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition">
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}

        {activeContentType === 'articles' && content.articles.map((article, idx) => (
          <div key={idx} className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{article.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-1">{article.excerpt}</p>
                <p className="text-gray-500 text-xs">{new Date(article.publishDate).toLocaleDateString()}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(article)} className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition">
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}

        {activeContentType === 'team' && content.team.map((member, idx) => (
          <div key={idx} className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-purple-400 text-sm">{member.role}</p>
                <p className="text-gray-400 text-xs">{member.bio}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(member)} className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition">
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}

        {((activeContentType === 'albums' && content.albums.length === 0) ||
          (activeContentType === 'videos' && content.videos.length === 0) ||
          (activeContentType === 'articles' && content.articles.length === 0) ||
          (activeContentType === 'team' && content.team.length === 0)) && (
          <div className="text-center py-12 text-gray-400">
            No {activeContentType} yet. Upload your first content!
          </div>
        )}
      </div>
    </div>
  );
};

const AdminUpload = ({ content, setContent, loadContent }) => {
  const [activeForm, setActiveForm] = useState('album');
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    setUploading(true);
    
    try {
      const timestamp = Date.now();
      let key, newItem;

      switch (activeForm) {
        case 'album':
          key = `albums:${timestamp}`;
          newItem = { ...formData, releaseDate: formData.releaseDate || new Date().toISOString() };
          await window.storage.set(key, JSON.stringify(newItem), false);
          break;
        case 'video':
          key = `videos:${timestamp}`;
          newItem = { ...formData, uploadDate: formData.uploadDate || new Date().toISOString() };
          await window.storage.set(key, JSON.stringify(newItem), false);
          break;
        case 'article':
          key = `articles:${timestamp}`;
          newItem = { ...formData, publishDate: formData.publishDate || new Date().toISOString() };
          await window.storage.set(key, JSON.stringify(newItem), false);
          break;
        case 'team':
          key = `team:${timestamp}`;
          newItem = formData;
          await window.storage.set(key, JSON.stringify(newItem), false);
          break;
      }

      await loadContent();
      setFormData({});
      alert('Content uploaded successfully!');
    } catch (error) {
      console.error('Error uploading content:', error);
      alert('Error uploading content. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Upload New Content</h1>
        <p className="text-gray-400">Add new albums, videos, articles, or team members</p>
      </div>

      <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setActiveForm('album')} className={`px-4 py-2 rounded-lg transition ${activeForm === 'album' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Album</button>
          <button onClick={() => setActiveForm('video')} className={`px-4 py-2 rounded-lg transition ${activeForm === 'video' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Video</button>
          <button onClick={() => setActiveForm('article')} className={`px-4 py-2 rounded-lg transition ${activeForm === 'article' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Article</button>
          <button onClick={() => setActiveForm('team')} className={`px-4 py-2 rounded-lg transition ${activeForm === 'team' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>Team</button>
        </div>

        <div className="space-y-4">
          {activeForm === 'album' && (
            <>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Album Name *</label>
                <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="Enter album name" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Artist Name *</label>
                <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="Enter artist name" onChange={(e) => setFormData({...formData, artist: e.target.value})} value={formData.artist || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Release Date</label>
                <input type="date" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" onChange={(e) => setFormData({...formData, releaseDate: e.target.value})} value={formData.releaseDate || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Music Embed Link (Spotify, SoundCloud, etc.)</label>
                <input type="url" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="https://..." onChange={(e) => setFormData({...formData, embedLink: e.target.value})} value={formData.embedLink || ''} />
              </div>
            </>
          )}

          {activeForm === 'video' && (
            <>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Video Title *</label>
                <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="Enter video title" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Description</label>
                <textarea className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" rows="3" placeholder="Video description" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description || ''}></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">YouTube Video ID * (e.g., dQw4w9WgXcQ)</label>
                <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="dQw4w9WgXcQ" onChange={(e) => setFormData({...formData, youtubeId: e.target.value})} value={formData.youtubeId || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Upload Date</label>
                <input type="date" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" onChange={(e) => setFormData({...formData, uploadDate: e.target.value})} value={formData.uploadDate || ''} />
              </div>
            </>
          )}

          {activeForm === 'article' && (
            <>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Article Title *</label>
                <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="Enter article title" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Excerpt *</label>
                <textarea required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" rows="3" placeholder="Brief summary or excerpt" onChange={(e) => setFormData({...formData, excerpt: e.target.value})} value={formData.excerpt || ''}></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Full Content</label>
                <textarea className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" rows="8" placeholder="Full article content" onChange={(e) => setFormData({...formData, content: e.target.value})} value={formData.content || ''}></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Publish Date</label>
                <input type="date" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" onChange={(e) => setFormData({...formData, publishDate: e.target.value})} value={formData.publishDate || ''} />
              </div>
            </>
          )}

          {activeForm === 'team' && (
            <>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Name *</label>
                <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="Full name" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Role *</label>
                <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" placeholder="e.g., Founder & CEO" onChange={(e) => setFormData({...formData, role: e.target.value})} value={formData.role || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Bio</label>
                <textarea className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" rows="4" placeholder="Brief bio" onChange={(e) => setFormData({...formData, bio: e.target.value})} value={formData.bio || ''}></textarea>
              </div>
            </>
          )}

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload Content</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomeSection = ({ content, companyInfo }) => (
  <div className="space-y-12">
    <div className="text-center py-12 space-y-4">
      <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
        {companyInfo.name}
      </h1>
      <p className="text-xl text-gray-300">{companyInfo.tagline}</p>
      <p className="text-gray-400 flex items-center justify-center space-x-2">
        <MapPin className="w-4 h-4" />
        <span>{companyInfo.location}</span>
      </p>
    </div>

    {content.albums.length > 0 && (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
          <Music className="w-8 h-8 text-purple-400" />
          <span>Latest Releases</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.albums.slice(0, 3).map((album, idx) => (
            <AlbumCard key={idx} album={album} featured={idx === 0} />
          ))}
        </div>
      </div>
    )}

    {content.videos.length > 0 && (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
          <Video className="w-8 h-8 text-purple-400" />
          <span>Recent Videos</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.videos.slice(0, 2).map((video, idx) => (
            <VideoCard key={idx} video={video} />
          ))}
        </div>
      </div>
    )}

    {content.articles.length > 0 && (
      <div>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
          <FileText className="w-8 h-8 text-purple-400" />
          <span>Recent Articles</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.articles.slice(0, 3).map((article, idx) => (
            <ArticleCard key={idx} article={article} />
          ))}
        </div>
      </div>
    )}
  </div>
);

const AlbumCard = ({ album, featured }) => (
  <div className={`backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-purple-400 transition transform hover:scale-105 ${featured ? 'md:col-span-2 lg:col-span-1 ring-2 ring-purple-400' : ''}`}>
    {featured && <div className="text-xs font-bold text-purple-400 mb-2">🔥 FEATURED</div>}
    <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center">
      <Music className="w-16 h-16 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{album.name}</h3>
    <p className="text-gray-400 text-sm mb-3">{album.artist}</p>
    <div className="flex items-center space-x-2 text-gray-400 text-xs mb-4">
      <Calendar className="w-3 h-3" />
      <span>{new Date(album.releaseDate).toLocaleDateString()}</span>
    </div>
    {album.embedLink && (
      <a href={album.embedLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
        <Play className="w-4 h-4" />
        <span>Listen Now</span>
      </a>
    )}
  </div>
);

const VideoCard = ({ video }) => (
  <div className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:border-purple-400 transition">
    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
      {video.youtubeId ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <Video className="w-16 h-16 text-white" />
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
      <p className="text-gray-400 text-sm mb-3">{video.description}</p>
      <div className="flex items-center space-x-2 text-gray-400 text-xs">
        <Calendar className="w-3 h-3" />
        <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

const ArticleCard = ({ article }) => (
  <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-purple-400 transition transform hover:scale-105">
    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
      <FileText className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
    <p className="text-gray-400 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 text-gray-400 text-xs">
        <Calendar className="w-3 h-3" />
        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
      </div>
      <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1">
        <span>Read</span>
        <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  </div>
);

const MusicSection = ({ albums }) => (
  <div className="space-y-6">
    <h2 className="text-4xl font-bold text-white mb-8">All Music</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album, idx) => (
        <AlbumCard key={idx} album={album} />
      ))}
      {albums.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-400">
          No albums yet. Login as admin to add your first release!
        </div>
      )}
    </div>
  </div>
);

const VideosSection = ({ videos }) => (
  <div className="space-y-6">
    <h2 className="text-4xl font-bold text-white mb-8">All Videos</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video, idx) => (
        <VideoCard key={idx} video={video} />
      ))}
      {videos.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-400">
          No videos yet. Login as admin to add your first video!
        </div>
      )}
    </div>
  </div>
);

const ArticlesSection = ({ articles }) => (
  <div className="space-y-6">
    <h2 className="text-4xl font-bold text-white mb-8">All Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
      {articles.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-400">
          No articles yet. Login as admin to add your first article!
        </div>
      )}
    </div>
  </div>
);

const TeamSection = ({ team, companyInfo }) => (
  <div className="space-y-6">
    <h2 className="text-4xl font-bold text-white mb-8">Our Team</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, idx) => (
        <div key={idx} className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
          <p className="text-purple-400 text-sm mb-2">{member.role}</p>
          <p className="text-gray-400 text-xs">{member.bio}</p>
        </div>
      ))}
      {team.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-400">
          No team members yet. Login as admin to add your team!
        </div>
      )}
    </div>
  </div>
);

export default TyvilaOnline;