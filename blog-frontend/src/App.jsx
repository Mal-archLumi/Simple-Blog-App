import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react'
import './App.css'

const API_BASE_URL = 'http://localhost:8000/api'

function App() {
  const [posts, setPosts] = useState([])
  const [currentView, setCurrentView] = useState('list') // 'list', 'create', 'edit', 'view'
  const [selectedPost, setSelectedPost] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false)

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/posts`)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Create a new post
  const createPost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        await fetchPosts()
        setCurrentView('list')
        setFormData({ title: '', content: '' })
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  // Update a post
  const updatePost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/posts/${selectedPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        await fetchPosts()
        setCurrentView('list')
        setFormData({ title: '', content: '' })
        setSelectedPost(null)
      }
    } catch (error) {
      console.error('Error updating post:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete a post
  const deletePost = async (id) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchPosts()
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load posts on component mount
  useEffect(() => {
    fetchPosts()
  }, [])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentView === 'create') {
      createPost()
    } else if (currentView === 'edit') {
      updatePost()
    }
  }

  // Handle edit button click
  const handleEdit = (post) => {
    setSelectedPost(post)
    setFormData({ title: post.title, content: post.content })
    setCurrentView('edit')
  }

  // Handle view post
  const handleView = (post) => {
    setSelectedPost(post)
    setCurrentView('view')
  }

  // Handle create new post
  const handleCreate = () => {
    setFormData({ title: '', content: '' })
    setCurrentView('create')
  }

  // Handle back to list
  const handleBack = () => {
    setCurrentView('list')
    setSelectedPost(null)
    setFormData({ title: '', content: '' })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Simple Blog App</h1>
          <p className="text-muted-foreground text-center">A simple blog built with Laravel and React</p>
        </header>

        {currentView === 'list' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Blog Posts</h2>
              <Button onClick={handleCreate} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No posts yet. Create your first post!
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1" onClick={() => handleView(post)}>
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <CardDescription>
                            {new Date(post.created_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deletePost(post.id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent onClick={() => handleView(post)}>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.content.substring(0, 200)}...
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {(currentView === 'create' || currentView === 'edit') && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h2 className="text-2xl font-semibold">
                {currentView === 'create' ? 'Create New Post' : 'Edit Post'}
              </h2>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your post content here..."
                      rows={10}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Saving...' : (currentView === 'create' ? 'Create Post' : 'Update Post')}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === 'view' && selectedPost && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(selectedPost)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deletePost(selectedPost.id)
                    handleBack()
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{selectedPost.title}</CardTitle>
                <CardDescription>
                  Published on {new Date(selectedPost.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {selectedPost.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

