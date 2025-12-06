import { fakeUsers as users } from '@/data/fake';
import { type User } from '@/types/chat.type';
import { useState } from 'react';

export function useUser(tabId: string) {
  // const testers: User = JSON.parse(sessionStorage.getItem(`testers_${tabId}`)!);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);

  // just a helper
  const getTester = (
    type: 'selected' | 'unselected' = 'selected',
    refValue: string
  ) => {
    return type === 'selected'
      ? users.filter((u) => u.id === refValue)[0]
      : users.filter((u) => u.id !== refValue)[0];
  };

  // if (selectedUser && !otherUser) {
  //   setOtherUser(getTester('unselected', selectedUser.id));
  // }

  const setUser = (refValue: string) => {
    setSelectedUser(getTester('selected', refValue));
    setOtherUser(getTester('unselected', refValue));
    // add to session the selected user
    sessionStorage.setItem(
      `testers_${tabId}`,
      JSON.stringify({ selectedUser })
    );
  };

  return { selectedUser, otherUser, setUser };
}
