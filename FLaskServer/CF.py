# def find_min(lis,src,des):
#     j = des
#     colour1 = lis[des][0]
#     colour2 = lis[des][1]
#     colour3 = lis[src][0]
#     colour4 = lis[src][1]
#     cost = 2*10**5+1
#     while j>=0:
#         if (colour1 in lis[j] or colour2 in lis[j]) and (colour3 in lis[j] or colour4 in lis[j]):
#             break
#         else:
#             j-=1
#     if j>=0:
#         cost = min(cost,abs(src-j)+abs(j-des))
        
#     j = des
#     while j<len(lis):
#         if (colour1 in lis[j] or colour2 in lis[j]) and (colour3 in lis[j] or colour4 in lis[j]):
#             break
#         else:
#             j+=1
#     if j<len(lis):
#         cost = min(cost,abs(src-j)+abs(j-des))
#     if cost == 2*10**5+1:
#         return -1
#     else:
#         return cost
    
            
        
    
    


# t = int(input())
# for i in range(t):
#     inp = input().split()
#     n = int(inp[0])
#     q = int(inp[1])
#     lis = input().split()
#     for k in range(q):
#         inp = input().split()
#         src = int(inp[0])
#         des = int(inp[1])
#         ans = find_min(lis,src-1,des-1)
#         print(ans)
        
        
    

pre = [0 for i in range(2*10**5+2)]
for i in range(1,2*10**5+2):
    n = i
    div = 0
    while n>0:
        div+=1
        n//=3   
    pre[i] = pre[i-1] + div
    
t = int(input())
for i in range(t):
    inp = input().split(" ")
    l = int(inp[0])
    r = int(inp[1])
    n = l
    div = 0
    while n>0:
        n//=3
        div+=1
    ans = pre[r] - pre[l-1] + div
    print(ans)
    

    
    
        