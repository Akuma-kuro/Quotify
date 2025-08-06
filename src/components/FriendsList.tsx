'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, MessageCircle, MoreVertical, Trash2 } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
}

export default function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Alex', status: 'online' },
    { id: '2', name: 'Sam', status: 'away', lastSeen: '2 hours ago' },
    { id: '3', name: 'Jordan', status: 'offline', lastSeen: 'Yesterday' },
  ]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');

  const addFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFriendName.trim()) {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: newFriendName.trim(),
        status: 'offline',
        lastSeen: 'Just added'
      };
      setFriends([...friends, newFriend]);
      setNewFriendName('');
      setShowAddFriend(false);
    }
  };

  const removeFriend = (id: string) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="glass rounded-2xl p-6 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-white/80" />
          <h2 className="text-lg font-medium text-white/90">Friends</h2>
        </div>
        <motion.button
          onClick={() => setShowAddFriend(!showAddFriend)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} className="text-white/80" />
        </motion.button>
      </div>

      {/* Add Friend Form */}
      <AnimatePresence>
        {showAddFriend && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={addFriend}
            className="mb-4 overflow-hidden"
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Friend's name"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                className="glass-input flex-1 text-sm py-2"
                autoFocus
              />
              <button
                type="submit"
                className="glass-button px-3 py-2 text-sm"
              >
                Add
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Friends List */}
      <div className="space-y-3">
        <AnimatePresence>
          {friends.map((friend) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {friend.name[0].toUpperCase()}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(friend.status)} rounded-full border-2 border-gray-900`} />
                </div>
                <div>
                  <div className="text-white/90 text-sm font-medium">{friend.name}</div>
                  {friend.lastSeen && (
                    <div className="text-white/50 text-xs">{friend.lastSeen}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <MessageCircle size={14} className="text-white/60" />
                </button>
                <button 
                  onClick={() => removeFriend(friend.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {friends.length === 0 && (
          <div className="text-center py-8 text-white/50">
            <Users size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No friends yet</p>
            <p className="text-xs">Add someone to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}